import { PORT } from "./configs";
import app from "./app";
import connectToDatabase from "./db";
import setupRoutes from "./routes";

connectToDatabase();
setupRoutes(app);

app.listen(PORT, () => {
  console.log(`🚀 on port ${PORT} !!!`);
});
