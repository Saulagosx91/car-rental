import { Router } from "express";
import { UserController } from "@app/controllers/user.controller";
import { container } from 'tsyringe';
import { CreateUserDTO, LoginUserDTO } from "@app/dtos/user.dto";
import validateDto from "@app/middlewares/validateDto";
import { userAuthenticated, adminAuthenticated } from "@app/middlewares/checkAuthenticate";

const userRoutes = Router();
const userController = container.resolve(UserController);

userRoutes
  .route('/')
  .get(userController.find.bind(userController))
  .post(validateDto(CreateUserDTO), userController.create.bind(userController));

userRoutes.get('/authenticate', userAuthenticated);

userRoutes.get('/authenticate/admin', adminAuthenticated);

userRoutes.post('/login', validateDto(LoginUserDTO), userController.login.bind(userController));

userRoutes.post('/logout', userController.logout.bind(userController));

export default userRoutes;