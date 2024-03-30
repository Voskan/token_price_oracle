import express, { Request, Response } from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

const port = process.env.PORT || 3000;

app.get("/api/users/currentuser", (req: Request, res: Response) => {
  res.send("Hi there!");
});

app.listen(port, () => {
  console.log("Listening on port 3000 !!!!!!");
});
