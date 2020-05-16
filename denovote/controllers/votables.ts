import { Request, Response } from "https://deno.land/x/attain/mod.ts";
import { Votable } from "../votable.ts";

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
