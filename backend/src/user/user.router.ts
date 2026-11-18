import { Router } from "express";
import { AuthMiddleware } from "../auth/middlewares/auth.middleware.ts";
import { UserController } from "./user.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createUserRouter(userController: UserController) {
  const userRouter = Router();

  userRouter.get(
    "/user",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    userController.findAll,
  );

  userRouter.get(
    "/user/me",
    AuthMiddleware,
    AutorizationMiddleware(["admin", "student", "teacher"]),
    userController.getMe,
  );

  userRouter.put(
    "/user/me",
    AuthMiddleware,
    AutorizationMiddleware(["admin", "student", "teacher"]),
    userController.updateMe,
  );

  userRouter.get(
    "/user/stats",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    userController.getStats,
  );
  userRouter.get(
    "/user/stats/home",
    AuthMiddleware,
    AutorizationMiddleware(["admin", "student", "teacher"]),
    userController.getsStatsHome,
  );
  userRouter.get(
    "/user/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin", "student", "teacher"]),
    userController.findById,
  );
  userRouter.put(
    "/user/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin", "student", "teacher"]),
    userController.update,
  );
  userRouter.delete(
    "/user/email/:email",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    userController.deleteByEmail,
  );
  userRouter.delete(
    "/user/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    userController.delete,
  );

  return userRouter;
}
