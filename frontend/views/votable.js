import { Utils } from "../utils.js";
import { NotFound } from "../views/notfound.js";
import { api } from "../config.js";

let getVotable = async (id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(api + "/votable/" + id, options);
    return await response.json();
  } catch (err) {
    console.log("Error", err);
  }
  return undefined;
};

let Votable = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let votable = await getVotable(request.id);

    if (votable) {
      return /*html*/ `
                ${votable?.text}
                ${votable.answers
                  .map((a) => {
                    return /*html*/ `
                    ${a.text}
                  `;
                  })
                  .join("\n")}
            `;
    }
    return await NotFound.render();
  },
};

export { Votable };
