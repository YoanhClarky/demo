import { Router } from "express";
import UsersRoutes from "./UsersRoutes";
import QuartiersRoutes from "./QuartierRoutes";
import ArrondissementsRoutes from "./ArrondissementsRoutes";
import VillesRoutes from "./VilleRoutes";

const router = Router()

router.use("/users", UsersRoutes)
router.use("/quartiers", QuartiersRoutes)
router.use("/arrondissements",ArrondissementsRoutes)
router.use("/villes", VillesRoutes)
export default router