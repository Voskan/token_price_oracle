import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { currentUserRouter } from "./api/routes/current-user";
import { signinRouter } from "./api/routes/signin";
import { signoutRouter } from "./api/routes/signout";
import { signupRouter } from "./api/routes/signup";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("AUTH SERVICE LISTENING ON PORT 3000 !!!!!!");
});
