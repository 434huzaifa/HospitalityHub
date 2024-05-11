import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import dayjs from "dayjs";
import cors from "cors";
import swaggerUi, { SwaggerUiOptions } from "swagger-ui-express";
const app = express();
const port = process.env.PORT || 3000;
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
app.get("/", (req, res) => {
  res.send("I AM RUNNING");
});

const options: SwaggerUiOptions = {
    customSiteTitle: "HospitalityHub",
  };
//   app.use("/docs", swaggerUi.serve, swaggerUi.setup(generator, options));

app.listen(port, () => {
  console.log(`I AM RUNNING ON http://localhost:${port}`);
});
export default app;
