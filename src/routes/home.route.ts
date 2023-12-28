import { Router } from "express";
import { homeController } from "../controllers";
import { ipMiddleware } from "../middleware";

const router: Router = Router();

router.get("/", ipMiddleware, homeController);

export default router;
