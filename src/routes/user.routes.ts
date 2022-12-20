import { Router } from "express";
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const userRoutes = Router()

userRoutes.post('', createUserController)
userRoutes.get('', ensureAuthMiddleware, listUsersController)
userRoutes.delete('/:id/', ensureAuthMiddleware, deleteUserController)
userRoutes.patch('/:id/', ensureAuthMiddleware, updateUserController)

export default userRoutes