import { createServer } from "http";
import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const server = createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on http://localhost:${PORT}`);
});
