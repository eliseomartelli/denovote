import { Request, Response } from "https://deno.land/x/attain/mod.ts";
import { Votable } from "../votable.ts";
import { Answer } from "../answer.ts";

import db from "../database.ts";

const database = db.getDatabase();
const votables = database.collection("votables");

export const getVotables = async (req: Request, res: Response) => {
  try {
    const fetchedVotables: Votable[] = await votables.find();
    res.status(200).send(fetchedVotables);
  } catch (error) {
    res.status(500).send({
      status: "Server Error",
    });
  }
};

export const postVotable = async (req: Request, res: Response) => {
  try {
    if (req.params.text && req.params.answers) {
      await votables
        .insertOne(new Votable(req.params.text, req.params.answers))
        .then((elem) => {
          res.status(200).send(elem);
        });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Server Error",
    });
  }
};

export const getVotable = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const fetchedVotable: Votable = await votables.findOne({
        _id: { $oid: req.params.id },
      });
      if (fetchedVotable) {
        res.status(200).send(fetchedVotable);
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Server Error",
    });
  }
};

export const setVote = async (req: Request, res: Response) => {
  try {
    if (req.params.id && req.params.aid) {
      var fetchedVotable: Votable = await votables.findOne({
        _id: { $oid: req.params.id },
      });
      if (fetchedVotable) {
        fetchedVotable.answers
          .find((answer: Answer) => {
            return answer.id == req.params.aid;
          })
          ?.incrementScore();
        votables.updateOne({ _id: { $oid: req.params.id } }, fetchedVotable);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Server Error",
    });
  }
};
