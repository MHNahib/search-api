import { Application } from "express";
import homeRoute from "./routes/home.route";
import searchroute from "./routes/searchroute";

const setupRoutes = (app: Application) => {
  app.use("/", homeRoute);
  app.use("/search", searchroute);
};

export default setupRoutes;
