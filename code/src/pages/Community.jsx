import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useScreenSize from "../hooks/useScreenSize";
import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { useDataContext } from "../contexts/DataContext";
import useKey from "../hooks/useKey";
import { useNavigate } from "react-router-dom";

const options = {
  "force new connection": true,
  reconnectionAttempts: Infinity,
  timeout: 10000,
  transports: ["websocket"],
  reconnection: true,
};

function Community() {
  const isMobile = useScreenSize();
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const [online, setOnline] = useState(0);
  const socketRef = useRef(null);
  // changes everytime due to re-render !!!
  const { id } = useDataContext();
  const [messages, setMessages] = useState([]);
  // console.log(id);
  const send = useRef(null);
  // console.log(messages);
  const { userLoggedIn } = useDataContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/auth");
    }
  }, [navigate, userLoggedIn]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  useKey("Enter", function () {
    if (document.activeElement !== send.current) {
      handleSend();
    }
  });

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3000", options);
    }
    socketRef.current.on("setUsers", (users, msg) => {
      setOnline(users);
      setMessages(msg);
    });
    socketRef.current.on("setMessage", (msg) => {
      setMessages(msg);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const handleSend = () => {
    if (message && socketRef.current) {
      const data = {
        id: id,
        message: message,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      socketRef.current.emit("updateMessage", data);
      setMessage("");
    }
  };

  return (
    <div className="p-5 flex flex-col sm:flex-row w-screen min-h-[85vh] space-x-0 sm:space-x-8 space-y-4 sm:space-y-0">
      {!isMobile && (
        <div className="w-full sm:w-3/4 h-full rounded-md ring-4 ring-offset-6 ring-[#b48e92] min-h-[85vh]">
          <div className="min-h-[1.5rem] bg-teal-200/70">
            <h1 className="p-2 text-center">Upcoming Q&A Sessions</h1>
          </div>
          <div className="">
            {Array.from({ length: 1 }, (_, i) => (
              <div
                className="w-full min-h-16 p-4 flex items-center justify-center"
                key={i}
              >
                <div className="px-5 py-4 border-[1px] border-black w-full flex justify-between rounded-md items-center">
                  <h1>{((i + 1 + (i + 1)) % 30) + 1}/12/2024</h1>
                  <button className="bg-[#b48e92] px-[25px] py-[9px] rounded-md text-white">
                    Remind Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="w-full sm:w-1/4 rounded-md ring-4 ring-offset-6 ring-[#b48e92] flex flex-col justify-between">
        <div className="min-h-[2.5rem] bg-teal-200/70 flex justify-between p-2">
          <h1 className="text-center">Chat with Anonymous Peers</h1>
          <div className="flex space-x-2 items-center justify-center">
            <div className="w-[10px] h-[10px] bg-green-500 rounded-full"></div>
            <p>{online}</p>
          </div>
        </div>
        <div className="flex p-2 flex-col overflow-y-auto h-full">
          {messages?.map((message, idx) => (
            <p
              key={idx}
              className={`${
                message.id === id ? "self-end" : ""
              } p-2 m-2 bg-orange-200 rounded-md w-fit flex flex-col`}
            >
              <p>{message.message}</p>
              <p className="text-xs">{message.time}</p>
            </p>
          ))}
        </div>
        <div className="bg-green-500 w-full flex items-center justify-between p-2 space-x-2">
          <textarea
            ref={textareaRef}
            className="w-full px-2 rounded-md text-black focus:outline-none resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
          />
          <button
            className="rounded-md self-end"
            onClick={handleSend}
            ref={send}
          >
            <FontAwesomeIcon icon={faRightLong} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Community;
