import { Router } from "express";
import UserController from "../controllers/UserController";
import { validateBody } from "../middlewares/validateBody";
import { CreateUserDto } from "../dtos/create-user.dto";

const UsersRoutes = Router();

UsersRoutes.post("/create", validateBody(CreateUserDto), UserController.create);
UsersRoutes.get("/", UserController.getAll);
UsersRoutes.put("/:id", UserController.update);
UsersRoutes.delete("/:id", UserController.delete);
UsersRoutes.get("/quartier/:quartier_id", UserController.getUsersByQuartier);
UsersRoutes.get("/user/:id",UserController.getUser)


export default UsersRoutes;