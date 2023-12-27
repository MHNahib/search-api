import { Application } from "express";
import homeRoute from "./routes/home.route";

const setupRoutes = (app: Application) => {
  app.use("/", homeRoute);
};

export default setupRoutes;
