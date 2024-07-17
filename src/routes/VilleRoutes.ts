import { Router } from "express";
import VilleController from "../controllers/VilleController";
import { validateBody } from "../middlewares/validateBody";
import { CreateVilleDto } from "../dtos/create-ville.dto";

const VillesRoutes = Router();

VillesRoutes.post("/create", validateBody(CreateVilleDto), VilleController.create);
VillesRoutes.get("/", VilleController.getAll);
VillesRoutes.put("/:id", VilleController.update);
VillesRoutes.delete("/:id", VilleController.delete);

export default VillesRoutes;