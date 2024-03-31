import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

import { router } from "./api/routes/routes";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();

app.use(json());
app.use("/api/users", router);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.ORACLE_MONOGO_URI!);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    throw err;
  }

  app.listen(process.env.APP_ORACLE_PORT, () => {
    console.log(
      `ORACLE SERVICE: Listening on port ${process.env.APP_ORACLE_PORT}`
    );
  });
};

start();
