require("dotenv").config();
import express from "express";
import { envConfig } from "./config/envConfig";
import { connectDB } from "./config/database.config";
import { userRouter } from "./routes/user.route";

connectDB()
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api/users", userRouter);
    app.listen(envConfig.port, () => {
      console.log("The server running successfully");
    });
  })
  .catch((error: string) => {
    console.log(`The server not running becuase ${error}`);
  });
