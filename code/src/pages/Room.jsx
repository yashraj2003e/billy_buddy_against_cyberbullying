import { useEffect, useCallback, useState, useRef } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { io } from "socket.io-client";
import { useDataContext } from "../contexts/DataContext";

const options = {
  "force new connection": true,
  reconnectionAttempts: Infinity,
  timeout: 10000,
  transports: ["websocket"],
  reconnection: true,
};

const RoomPage = () => {
  const socketRef = useRef(null);
  const { id } = useDataContext();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const sendStreams = useCallback(() => {
    if (myStream) {
      for (const track of myStream.getTracks()) {
        if (!peer.peer.getSenders().some((sender) => sender.track === track)) {
          peer.peer.addTrack(track, myStream);
        }
      }
    }
  }, [myStream]);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    sendStreams();
    const offer = await peer.getOffer();
    socketRef.current.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, sendStreams]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      sendStreams();
      const ans = await peer.getAnswer(offer);
      socketRef.current.emit("call:accepted", { to: from, ans });
    },
    [sendStreams]
  );

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    if (peer.peer.signalingState !== "stable") return;
    const offer = await peer.getOffer();
    socketRef.current.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId]);

  const handleNegoNeedIncomming = useCallback(async ({ from, offer }) => {
    try {
      if (peer.peer.signalingState !== "stable") return;
      const ans = await peer.getAnswer(offer);
      socketRef.current.emit("peer:nego:done", { to: from, ans });
    } catch (error) {
      console.error("Negotiation failed:", error);
    }
  }, []);

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    try {
      await peer.setLocalDescription(ans);
    } catch (error) {
      console.error("Failed to set remote description:", error);
    }
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    peer.peer.addEventListener("track", (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:8000", options);
    }

    socketRef.current.emit("room:join", { email: id });
    socketRef.current.on("user:joined", handleUserJoined);
    socketRef.current.on("incomming:call", handleIncommingCall);
    socketRef.current.on("call:accepted", handleCallAccepted);
    socketRef.current.on("peer:nego:needed", handleNegoNeedIncomming);
    socketRef.current.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("user:joined", handleUserJoined);
        socketRef.current.off("incomming:call", handleIncommingCall);
        socketRef.current.off("call:accepted", handleCallAccepted);
        socketRef.current.off("peer:nego:needed", handleNegoNeedIncomming);
        socketRef.current.off("peer:nego:final", handleNegoNeedFinal);
      }
    };
  }, [
    id,
    handleCallAccepted,
    handleIncommingCall,
    handleNegoNeedFinal,
    handleNegoNeedIncomming,
    handleUserJoined,
  ]);

  return (
    <div>
      <h1>Q&A Session</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {myStream && (
          <div style={{ marginRight: "20px" }}>
            <h1>My Stream</h1>
            <ReactPlayer
              playing
              muted
              height="350px"
              width="30vw"
              url={myStream}
            />
          </div>
        )}
        {remoteStream && (
          <div>
            <h1>Remote Stream</h1>
            <ReactPlayer
              playing
              muted
              height="350px"
              width="30vw"
              url={remoteStream}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomPage;
