import { Router } from "express";
import memberRouter from "./member.routes";
import userRouter from "./user.routes";
import roleRouter from "./role.routes";
import communityRouter from "./community.routes";

const globalRouter = Router();

globalRouter.use("/api",memberRouter)
globalRouter.use("/auth",userRouter)
globalRouter.use("/api",roleRouter);
globalRouter.use("/api",communityRouter)


export default globalRouter;