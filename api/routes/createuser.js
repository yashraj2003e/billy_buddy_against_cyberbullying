import { Router } from "express";
import { createUserDB } from "../controllers/usercontroller.js";

const userRouter = Router();

userRouter.post("/", createUserDB);

export default userRouter;
