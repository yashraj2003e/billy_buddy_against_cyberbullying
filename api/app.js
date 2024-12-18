import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => res.send("HELLO"));

let users = 0;

let messages = [];

console.log(messages);
io.on("connection", (socket) => {
  console.log(`${socket.id} joined the room !}`);
  users++;
  socket.emit("setUsers", users, messages);
  socket.broadcast.emit("setUsers", users, messages);
  socket.on("disconnecting", () => {
    users--;
    socket.broadcast.emit("setUsers", users, messages);
  });
  socket.on("updateMessage", (data) => {
    messages = [...messages, data];
    socket.broadcast.emit("setMessage", messages);
    console.log(messages);
    socket.emit("setMessage", messages);
  });
});

server.listen(3000, () => console.log("Server is running on port 3000 !"));

/*
TODO:
  1. Add Reverse-Geocoding !
  2. Database operations !
GOODNIGHT !!!
*/
