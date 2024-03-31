import express, { Request, Response } from "express";
import { json } from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();
app.use(json());

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("PRICE ORACLE SERVICE LISTENING ON PORT 3001 !!!!!!");
});
