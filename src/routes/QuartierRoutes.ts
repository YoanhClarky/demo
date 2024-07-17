import { Router } from "express";
import QuartierController from "../controllers/QuartierController";
import { validateBody } from "../middlewares/validateBody";
import { CreateQuartierDto } from "../dtos/create-quartier.dto";

const QuartiersRoutes = Router();

QuartiersRoutes.post("/create", validateBody(CreateQuartierDto), QuartierController.create);
QuartiersRoutes.get("/", QuartierController.getAll);
QuartiersRoutes.put("/:id", QuartierController.update);
QuartiersRoutes.delete("/:id", QuartierController.delete);

export default QuartiersRoutes;