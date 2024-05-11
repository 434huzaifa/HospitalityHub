import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { userDocument } from "./user";
import { OpenAPIObjectConfig } from "@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator";

export const registry = new OpenAPIRegistry();
userDocument.map((x) => {
  registry.registerPath(x);
});

const config: OpenAPIObjectConfig = {
  openapi: "3.0.0",
  info: {
    title: "HospitalityHub",
    version: "1.0.0",
    description: "A simple API EduSphere.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "If you run you server at localhost:3000",
    },
  ],
};

export const generator = new OpenApiGeneratorV3(
  registry.definitions
).generateDocument(config);
