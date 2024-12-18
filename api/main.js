import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      id: "user-3",
    },
  });
  console.log("Created User:", newUser);

  // Create a new chat associated with the user
  const newChat = await prisma.chat.create({
    data: {
      id: "chat-3",
      userId: newUser.id,
      message: "Hello There",
      date: "18-12-2024",
      time: "05:57 AM",
    },
  });
  console.log("Created Chat:", newChat);

  // Fetch the user along with their chats
  const userWithChats = await prisma.user.findUnique({
    where: { id: newUser.id },
    include: { chats: true },
  });
  console.log("User with Chats:", userWithChats);

  // Fetch the chat along with the associated user
  const chatWithUser = await prisma.chat.findMany();
  console.log("Chat with User:", chatWithUser);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
