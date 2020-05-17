import { Utils } from "./utils.js";

import { Home } from "./views/home.js";
import { NotFound } from "./views/notfound.js";
import { Votable } from "./views/votable.js";
import { AddVotable } from "./views/addvotable.js";

const routes = {
  "/": Home,
  "/votable/:id": Votable,
  "/add": AddVotable,
};

const router = async () => {
  const content = null || document.getElementById("page_container");

  await reload(content);
};

export const reload = async (content) => {
  let request = Utils.parseRequestURL();
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "");
  let page = routes[parsedURL] ? routes[parsedURL] : NotFound;
  content.innerHTML = await page.render();
  if (page.after_render) {
    await page.after_render();
  }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
