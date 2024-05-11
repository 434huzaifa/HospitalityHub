import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { errorResponse } from "../validator/error";
import { authResponse, userAuthBody } from "../validator/auth";

const authDocument: RouteConfig[] = [
    {
        method: "post",
        description:"Authorize and get token. [see this how to use token](https://www.youtube.com/watch?v=8wxprVcHB5w)",
        path: "/userauth",
        request: {
          body: {
            content: {
              "application/json": {
                schema: userAuthBody.openapi("UserAuth"),
              },
            },
          },
        },
        responses: {
          200: {
            description: "",
            content: {
              "application/json": {
                schema: authResponse.openapi("AuthResponse"),
              },
            },
          },
        },
      },
]

authDocument.forEach((x) => {
    x.tags = ["Auth"];
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
  export default authDocument;