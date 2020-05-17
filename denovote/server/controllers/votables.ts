import { Request, Response } from "https://deno.land/x/attain/mod.ts";
import { Votable } from "../models/votable.ts";

import db from "../database.ts";

const database = db.getDatabase();
const votables = database.collection("votables");

export const getVotables = async (req: Request, res: Response) => {
  try {
    const fetchedVotables: Votable[] = await votables.aggregate([
      { $sort: { _id: -1 } },
    ]);
    res.status(200).send(fetchedVotables);
  } catch (error) {
    send500(res, error);
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
    send500(res, error);
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
    send500(res, error);
  }
};

export const setVote = async (req: Request, res: Response) => {
  try {
    if (req.params.id && req.params.aid) {
      let fetchedVotable: Votable = await votables.findOne({
        _id: { $oid: req.params.id },
      });
      if (fetchedVotable) {
        let answer = fetchedVotable.answers.find((a) => a.id == req.params.aid);
        if (answer) {
          answer.score = answer.score + 1;
        }
        votables.updateOne({ _id: { $oid: req.params.id } }, fetchedVotable);
        await getVotable(req, res);
      }
    }
  } catch (error) {
    send500(res, error);
  }
};

const send500 = (res: Response, error: Error) => {
  console.log(error);
  res.status(500).send({
    status: "Server Error",
  });
};
