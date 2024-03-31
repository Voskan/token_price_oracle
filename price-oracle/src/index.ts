import express, { Request, Response } from "express";
import { json } from "body-parser";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(json());

app.listen(PORT, () => {
  console.log("Listening on port 3001 !!!!!!");
});
