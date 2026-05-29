import serverless from "serverless-http";
import app from "./src/app.js";
import connectDB from "./src/db.js";

connectDB();

export const handler = async (event, context) => {

  const server = serverless(app);

  return server(event, context);
};
