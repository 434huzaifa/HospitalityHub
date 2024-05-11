import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import dayjs from "dayjs";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import swaggerUi, { SwaggerUiOptions } from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import userRouter from "./router/user";
import { generator } from "./documentation";
import authRouter from "./router/auth";
import roomRouter from "./router/room";
const app = express();
const port = process.env.PORT || 3000;

const db_URL = process.env.DB_URL;
if (db_URL) {
  connect(db_URL);
} else {
  console.log("No db found");
}

app.use(cors());
app.use(express.urlencoded({ extended: false }));
const ParseJson = (req: Request, res: Response, next: NextFunction) => {
  const errorHandler = (err: Error | null) => {
    if (err instanceof Error) {
      res.status(400).send({ msg: err.message });
      return;
    }
    next();
  };
  express.json()(req, res, errorHandler);
};
app.use(ParseJson);
app.use(express.static("public"));
app.use(
  logger(function (tokens, req, res) {
    return [
      dayjs().format("MMM DD hh:mm:ss A"),
      tokens.url(req, res),
      tokens.method(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
    ].join(" - ");
  })
);
app.use(cookieParser());
app.use("/", userRouter);
app.use("/",authRouter)
app.use("/",roomRouter)
app.get("/", (req, res) => {
  res.send("I AM RUNNING");
});

const options: SwaggerUiOptions = {
  customSiteTitle: "HospitalityHub",
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(generator, options));

app.listen(port, () => {
  console.log(`I AM RUNNING ON http://localhost:${port}`);
});
export default app;
