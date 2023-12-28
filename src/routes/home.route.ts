import { Router } from "express";
import { homeController } from "../controllers";

const router: Router = Router();

router.get("/", homeController);

export default router;
