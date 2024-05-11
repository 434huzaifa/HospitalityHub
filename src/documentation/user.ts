import { userResponse } from "./../validator/user";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { userCreateBody } from "../validator/user";
import { errorResponse } from "../validator/error";

export const userDocument: RouteConfig[] = [
  {
    method: "post",
    path: "/user",
    tags: ["User"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: userCreateBody,
          },
        },
      },
    },
    responses: {
      201: {
        description: "",
        content: {
          "application/json": {
            schema: userResponse.openapi("UserResponse"),
          },
        },
      },
      404: {
        description: "",
        content: {
          "application/json": {
            schema: errorResponse.openapi("ErrorResponse"),
          },
        },
      },
      400: {
        description: "",
        content: {
          "application/json": {
            schema: errorResponse.openapi("ErrorResponse"),
          },
        },
      },
      500: {
        description: "",
        content: {
          "application/json": {
            schema: errorResponse.openapi("ErrorResponse"),
          },
        },
      },
    },
  },
];
