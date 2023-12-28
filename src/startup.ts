import { DB_URI, EXTERNAL_API, PORT } from "./configs";
import connectToDatabase from "./dbConnection/db";

const startup = () => {
  if (!PORT || !DB_URI || !EXTERNAL_API) {
    console.error("Please update configs to start the app!");
    process.exit(1);
  }

  connectToDatabase();
};

export default startup;
