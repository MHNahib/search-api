import { PORT } from "./configs";
import app from "./app";
import connectToDatabase from "./db";
import setupRoutes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware";

connectToDatabase();
setupRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 on port ${PORT} !!!`);
});
