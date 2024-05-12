import {
    bookingCreateBody,
    bookingQuery,
    bookingResponse,
    bookingUpdateBody,
  } from "./../validator/booking";
  import { RouteConfig } from "@asteasolutions/zod-to-openapi";
  import { errorResponse } from "../validator/error";
  
  const bookingDocument: RouteConfig[] = [
    {
      method: "post",
      path: "/booking",
      request: {
        body: {
          content: {
            "application/json": {
              schema: bookingCreateBody.openapi("BookingCreateBody"),
            },
          },
        },
      },
      responses: {
        201: {
          description: "",
          content: {
            "application/json": {
              schema: bookingResponse.openapi("BookingResponse"),
            },
          },
        },
      },
    },
    {
      method: "get",
      path: "/booking",
      request: {
        query:bookingQuery.openapi("bookingQuery")
      },
      responses: {
        201: {
          description: "",
          content: {
            "application/json": {
              schema: bookingResponse.openapi("BookingResponse"),
            },
          },
        },
      },
    },
    {
      method: "get",
      path: "/bookingall",
      responses: {
        200: {
          description: "",
          content: {
            "application/json": {
              schema: bookingResponse.array().openapi("BookingResponse"),
            },
          },
        },
      },
    },
    {
      method: "put",
      path: "/booking",
      request: {
        query: bookingQuery.openapi("RoomQuery"),
        body: {
          content: {
            "application/json": {
              schema: bookingUpdateBody.openapi("BookingUpdateBody"),
            },
          },
        }
      },
      responses: {
        201: {
          description: "",
          content: {
            "application/json": {
              schema: bookingResponse.openapi("BookingResponse"),
            },
          },
        },
      },
    },
    {
      method: "delete",
      path: "/booking",
      request: {
        query: bookingQuery.openapi("BookingQuery"),
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
  
  bookingDocument.forEach((x) => {
    x.tags = ["Booking"];
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
  
  export default bookingDocument;
  