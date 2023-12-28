import { Router } from "express";
import { searchController } from "../controllers";

const router: Router = Router();

router.get("/", searchController);

export default router;
