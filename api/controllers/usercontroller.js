import Prisma from "../lib/prisma.js";

export async function createUserDB(req, res) {
  try {
    const { id } = req.body;

    const userExists = await Prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      await Prisma.user.create({
        data: {
          id: id,
        },
      });
      res.status(201).json({ message: "Created User Successfully !" });
      return;
    }

    res.status(200).json({ message: "User Exists Already !" });
  } catch (e) {
    res.status(500).json({ message: "Unable to Create User !" });
  }
}
