import { Router } from "express";
import { UserController } from "./user.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createUserRouter(userController: UserController) {
  const userRouter = Router();

  userRouter.get(
    "/user",
    AutorizationMiddleware(["admin"]),
    userController.findAll,
  );
  userRouter.get(
    "/user/stats",
    AutorizationMiddleware(["admin"]),
    userController.getStats,
  );
  userRouter.get(
    "/user/:id",
    AutorizationMiddleware(["admin", "student", "teacher"]),
    userController.findById,
  );
  userRouter.put(
    "/user/:id",
    AutorizationMiddleware(["admin", "student", "teacher"]),
    userController.update,
  );
  userRouter.delete(
    "/user/email/:email",
    AutorizationMiddleware(["admin"]),
    userController.deleteByEmail,
  );
  userRouter.delete(
    "/user/:id",
    AutorizationMiddleware(["admin"]),
    userController.delete,
  );

  return userRouter;
}
