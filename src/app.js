import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import router from "./app.router.js";
import NODE_ENV from "./config/common.js";

class App {
  constructor(port) {
    this.#setEnviroment();
    this.express = express();
    this.express.set("port", port);
    this.#middleware();
    this.#routes();
  }

  #middleware() {
    this.express.set("etag", false);
    this.express.use(cors({ origin: "*" }));
    this.express.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.express.use(bodyParser.json());
  }

  #setEnviroment() {
    const envFile = `.env.${NODE_ENV || 'development'}`;
    dotenv.config({ path: envFile });
  }

  #routes() {
    this.#swaggerApi();
    this.express.use(router);
  }

  #swaggerApi() {
    const swaggerDocument = YAML.load("./docs/swagger.yaml");
    this.express.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default App;
