require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Anidex REST server endpoints with requests and responses",
    description: "We tried to make Anidex backend in a RESTfull api structure.",
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "User related endpoints",
    },
    {
      name: "anime",
      description: "anime related endpoints",
    },
    {
      name: "watchlist",
      description: "watchlist related endpoints",
    },
  ],
  securityDefinitions: {},
  definitions: {},
  components: {
    securitySchemes: {
      jwtBearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    parameters: {},
    schemas: {
      UserOutput: {
        type: "object",
        required: [],
        properties: {
          userID: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          bio: {
            type: "string",
          },
          pictureID: {
            type: "string",
          },
          admin: {
            type: "boolean",
          },
        },
        example: {
          userID: "John",
          email: "test@test.com",
          bio: "testing ",
          pictureID: "172be620-0b8a-11ed-9a37-270f3e591cbd.jpg",
          admin: false,
        },
      },
      AnimeOutput: {
        type: "object",
        required: [],
        properties: {
          animeid: {
            type: "integer",
          },
          title: {
            type: "string",
          },
          releaseseason: {
            type: "string",
          },
          releasedate: {
            type: "string",
            format: "date",
          },
          averagerating: {
            type: "number",
            format: "double",
          },
          animerank: {
            type: "integer",
          },
          synopsis: {
            type: "string",
          },
        },
        example: {
          animeID: 12,
          title: "Attack On Titan",
          releaseseason: "Spring",
          releasedate: "2013-09-09",
          averagerating: 8.5,
          animerank: 2,
          synopsis: "Long time ago...",
        },
      },
      WatchlistOutput: {
        type: "object",
        properties: {
          animeID: {
            type: "integer",
          },
          favourite: {
            type: "boolean",
          },
        },
        example: {
          animeID: 13,
          favourite: true,
        },
      },
    },
    respones: {
      AllUsers: {
        success: true,
        results: [
          {
            userID: "John",
            email: "test@test.com",
            bio: "testing ",
            pictureID: "172be620-0b8a-11ed-9a37-270f3e591cbd.jpg",
            admin: false,
          },
        ],
      },
      NoUsers: {
        success: false,
        message: "No users found",
      },
      User: {
        success: true,
        user: {
          userID: "John",
          email: "test@test.com",
          bio: "testing ",
          pictureID: "172be620-0b8a-11ed-9a37-270f3e591cbd.jpg",
          admin: false,
        },
      },
      NoUser: {
        success: false,
        message: "No user with provided userID",
      },
      AllAnime: {
        success: true,
        allAnime: [
          {
            animeID: 12,
            title: "Attack On Titan",
            releaseseason: "Spring",
            releasedate: "2013-09-09",
            averagerating: 8.5,
            animerank: 2,
            synopsis: "Long time ago...",
          },
        ],
      },
      NoItem: {
        success: false,
        message: "No item found",
      },
      Anime: {
        success: true,
        anime: {
          animeID: 12,
          title: "Attack On Titan",
          releaseseason: "Spring",
          releasedate: "2013-09-09",
          averagerating: 8.5,
          animerank: 2,
          synopsis: "Long time ago...",
        },
      },
      ServerSideError: {
        message: "Retrieving resources failed, please try again later",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["../routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
