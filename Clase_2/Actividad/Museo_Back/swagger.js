import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Museo",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:3021/"
      }
    ]
  },
  apis: ["./controller/controllerMUSEO.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;