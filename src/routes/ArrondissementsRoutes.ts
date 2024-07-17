import { Router } from "express";
import ArrondissementController from "../controllers/ArrondissementController";
import { validateBody } from "../middlewares/validateBody";
import { CreateArrondissementDto } from "../dtos/create-arrondissement.dto";

const ArrondissementsRoutes = Router();

ArrondissementsRoutes.post("/create", validateBody(CreateArrondissementDto), ArrondissementController.create);
ArrondissementsRoutes.get("/", ArrondissementController.getAll);
ArrondissementsRoutes.put("/:id", ArrondissementController.update);
ArrondissementsRoutes.delete("/:id", ArrondissementController.delete);

export default ArrondissementsRoutes;