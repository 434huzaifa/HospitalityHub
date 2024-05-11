import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { OpenAPIObjectConfig } from "@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator";
import userDocument from "./user";

export const registry = new OpenAPIRegistry();
userDocument.map((x) => {
  registry.registerPath(x);
});

const config: OpenAPIObjectConfig = {
  openapi: "3.0.0",
  info: {
    title: "HospitalityHub",
    version: "1.0.0",
    description: "A simple API for HospitalityHub.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "If you run your local server at localhost:3000",
    },
  ],
};

export const generator = new OpenApiGeneratorV3(
  registry.definitions
).generateDocument(config);
