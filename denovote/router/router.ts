import { Router } from "https://deno.land/x/attain/mod.ts";
import {
  getVotables,
  postVotable,
  getVotable,
  setVote,
} from "../controllers/votables.ts";

const router = new Router();

router.get("/", async (req, res) => {
  await res.status(200).send({
    status: "OK",
  });
});

router.get("/votable", async (req, res) => {
  await getVotables(req, res);
});

router.post("/votable", async (req, res) => {
  await postVotable(req, res);
});

router.get("/votable/:id", async (req, res) => {
  await getVotable(req, res);
});

router.post("/votable/:id/:aid/vote", async (req, res) => {
  await setVote(req, res);
});

export { router };
