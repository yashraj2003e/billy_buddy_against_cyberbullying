import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routes/createuser.js";
import bodyParser from "body-parser";
import Prisma from "./lib/prisma.js";

const app = express();
app.use(cors());
app.use(bodyParser());

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => res.send("HELLO"));
app.use("/createUser", userRouter);

let users = 0;

let messages = [];

async function saveChat(currentChat) {
  await Prisma.chat.create({
    data: { ...currentChat, chatId: crypto.randomUUID() },
  });
}

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
  socket.on("updateMessage", async (data) => {
    messages = [...messages, data];
    await saveChat(data);
    socket.broadcast.emit("setMessage", messages);
    console.log(messages);
    socket.emit("setMessage", messages);
  });
});

server.listen(3000, () => console.log("Server is running on port 3000 !"));

/*
TODO:
  1. Add Reverse-Geocoding ! (DONE) 
  2. Database operations ! (ALMOST DONE !)
GOODNIGHT !!!
*/
