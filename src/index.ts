import { PORT } from "./configs";
import app from "./app";
import { Request } from "express";
import setupRoutes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware";
import startup from "./startup";
import cors from "cors";

app.use(cors<Request>());

startup();
setupRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 on port ${PORT} !!!`);
});
