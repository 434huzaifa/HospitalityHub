import { userAuthBody, userQuery, userResponse } from "./../validator/user";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { userCreateBody } from "../validator/user";
import { errorResponse } from "../validator/error";

const userDocument: RouteConfig[] = [
  {
    method: "post",
    path: "/user",
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
    },
  },
  {
    method: "post",
    path: "/userauth",
    request: {
      body: {
        content: {
          "application/json": {
            schema: userAuthBody,
          },
        },
      },
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: userResponse.openapi("UserResponse"),
          },
        },
      },
    },
  },
  {
    method: "delete",
    path: "/user",
    request: {
      query: userQuery,
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: userResponse.openapi("UserResponse"),
          },
        },
      },
    },
  },
];

userDocument.forEach((x) => {
  x.tags = ["User"];
  x.responses = {
    ...x.responses,
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
  };
});
export default userDocument;
