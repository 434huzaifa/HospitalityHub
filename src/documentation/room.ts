import {
  roomCreateBody,
  roomQuery,
  roomResponse,
  roomUpdateBody,
} from "./../validator/room";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { errorResponse } from "../validator/error";

const roomDocument: RouteConfig[] = [
  {
    method: "post",
    path: "/room",
    request: {
      body: {
        content: {
          "application/json": {
            schema: roomCreateBody.openapi("RoomCreateBody"),
          },
        },
      },
    },
    responses: {
      201: {
        description: "",
        content: {
          "application/json": {
            schema: roomResponse.openapi("roomResponse"),
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/room",
    request: {
      body: {
        content: {
          "application/json": {
            schema: roomUpdateBody.openapi("RoomUpdateBody"),
          },
        },
      },
    },
    responses: {
      201: {
        description: "",
        content: {
          "application/json": {
            schema: roomResponse.openapi("roomResponse"),
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/roomall",
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: roomResponse.array().openapi("roomResponse"),
          },
        },
      },
    },
  },
  {
    method: "put",
    path: "/room",
    request: {
      query: roomQuery.openapi("RoomQuery"),
    },
    responses: {
      201: {
        description: "",
        content: {
          "application/json": {
            schema: roomResponse.openapi("roomResponse"),
          },
        },
      },
    },
  },
  {
    method: "delete",
    path: "/room",
    request: {
      query: roomQuery.openapi("RoomQuery"),
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: errorResponse.openapi("DeleteSuccess"),
          },
        },
      },
    },
  },
];

roomDocument.forEach((x) => {
  x.tags = ["Room"];
  x.security = [
    {
      BearerAuth: [],
    },
  ];
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

export default roomDocument;
