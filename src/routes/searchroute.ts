import { Router } from "express";
import { searchController } from "../controllers";
import { ipMiddleware } from "../middleware";

const router: Router = Router();

router.get("/", ipMiddleware, searchController);

export default router;
