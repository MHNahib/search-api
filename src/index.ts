import { PORT } from "./configs";
import app from "./app";
import setupRoutes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware";
import startup from "./startup";

startup();
setupRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 on port ${PORT} !!!`);
});
