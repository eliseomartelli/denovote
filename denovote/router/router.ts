import { Router } from "https://deno.land/x/attain/mod.ts";
import { getVotables } from "../controllers/votables.ts";
import { Request, Response } from "https://deno.land/x/attain/mod.ts";

const router = new Router();

router.get("/", async (req, res) => {
  await res.status(200).send({
    status: "OK",
  });
});

router.get("/votables", async (req, res) => {
  await getVotables(req, res);
});

export { router };
