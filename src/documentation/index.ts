import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { OpenAPIObjectConfig } from "@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator";
import userDocument from "./user";
import authDocument from "./auth";
import roomDocument from "./room";
import bookingDocument from "./booking";
const registry = new OpenAPIRegistry();

authDocument.map((x) => {
  registry.registerPath(x);
});

userDocument.map((x) => {
  registry.registerPath(x);
});

roomDocument.map((x) => {
  registry.registerPath(x);
});

bookingDocument.map((x) => {
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

generator.components = {
  ...generator.components,
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};
