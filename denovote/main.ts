import { App, Response } from "https://deno.land/x/attain/mod.ts";
import parser from "https://deno.land/x/attain/plugins/json-parser.ts";

import { Votable } from "./votable.ts";
import { Answer } from "./answer.ts";
import { SQLite } from "./database/sqlite.ts";

const database = new SQLite("test.db");
database.getVotables();

const app = new App();

app.use(parser);

var votables = [
  new Votable(0, "How are you doin'?", [
    new Answer(1, "Well."),
    new Answer(2, "Not so well."),
  ]),
];

app.use("/", (req, res) => {
  res.status(200).send(votables);
});

app.use("/:id", (req, res) => {
  let votable = getVotable(req.params.id);
  if (votable) {
    res.status(200).send(votable.toJSON());
  }
  res.status(404).send({
    status: 404,
  });
});

app.post("/votable/:id", (req, res) => {
  if (!getVotable(req.params.id) && req.params.text) {
    votables.push(new Votable(req.params.id, req.params.text, []));
    res.status(200).send({
      status: 200,
    });
  }
  res.status(404).send({
    status: 404,
  });
});

app.use("/vote/:vid/:aid", (req, res) => {
  let votable = getVotable(req.params.vid);
  let answer = votable?.answers.find((a) => {
    return a.id == req.params.aid;
  });
  if (answer) {
    answer.incrementScore();
    res.status(200).send({
      status: 200,
    });
  }
  res.status(404).send({
    status: 404,
  });
});

function getVotable(id: number) {
  return votables.find((votable) => {
    return votable.id == id;
  });
}

app.listen({
  port: 8080,
});
