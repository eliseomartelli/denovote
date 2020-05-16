import { App } from "https://deno.land/x/attain/mod.ts";
import parser from "https://deno.land/x/attain/plugins/json-parser.ts";

import { router } from "./router/router.ts";

const init = async () => {
  const app = new App();
  app.use(parser);
  app.use("/api", router);
  app.use(async (req, res) => {
    res.status(404).send({
      status: "Not found.",
    });
  });
  app.listen({
    port: 8080,
  });
};

init();

import db from "./database.ts";
import { Votable } from "./votable.ts";

const database = db.getDatabase();
const votables = database.collection("votables");

votables.insertOne(new Votable("Hello friend", []));
votables.insertOne(new Votable("Hello friend", []));
