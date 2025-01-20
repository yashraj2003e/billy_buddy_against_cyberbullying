import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import Prisma from "./lib/prisma.js";

const app = express();
app.use(cors());
app.use(express.json());

// async function test() {
//   const filteredData = {
//     image:
//       "https://res.cloudinary.com/dm87sudhx/image/upload/v1737340939/images/wybazoavi5qszceqb6fj.png",
//   };
//   const result = await fetch("http://localhost:3001/detectCrime", {
//     method: "POST",
//     body: JSON.stringify({ image: filteredData.image }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await result.json();
//   console.log(data.cyberbullying);
// }

// test();

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => res.send("HELLO"));

app.post("/createUser", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const userExists = await Prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (userExists) {
      return res.status(200).json({ message: "User already Exists !" });
    }

    await Prisma.user.create({
      data: {
        id,
      },
    });
    res.status(200).json({ message: "User added Successfully !" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Unable to add User !" });
  }
});

app.post("/addEvidence", async (req, res) => {
  try {
    const filteredData = Object.fromEntries(
      Object.entries(req.body).filter(([_, v]) => v != null && v !== "")
    );

    if (filteredData.image) {
      const result = await fetch("http://localhost:3001/detectCrime", {
        method: "POST",
        body: JSON.stringify({ image: filteredData.image }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      const data = await result.json();
      const detected = data.cyberbullying;

      await Prisma.evidence.create({
        data: { ...filteredData, detected },
      });
    } else {
      await Prisma.evidence.create({
        data: filteredData,
      });
    }

    res.status(200).json({ message: "Evidence Submitted Successfully !" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some error Occurred !" });
  }
});

app.get("/evidence", async (req, res) => {
  try {
    const result = await Prisma.evidence.findMany();
    console.log();
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some error occurred !" });
  }
});

let users = 0;

let messages = [];

async function saveChat(currentChat) {
  await Prisma.chat.create({
    data: { ...currentChat, chatId: crypto.randomUUID() },
  });
}

async function getChats() {
  const response = await Prisma.chat.findMany();
  messages = response;
}

getChats();

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
    socket.emit("setMessage", messages);
  });
});

server.listen(3000, () => console.log("Server is running on port 3000 !"));
