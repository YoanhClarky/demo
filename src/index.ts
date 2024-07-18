import * as express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes";

const bodyParser = require("body-parser");
const server = express();
server.use(bodyParser.json());
server.use(router);
server.use(express.json());
server.get("/", (req, res) => {
  res.send("Api en marche");
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Tout est connecté");
    server.listen(3002, () => {
      console.log("Le serveur utilise le port 3002");
    });
  })
  .catch((error) => console.log(error));

export default server;