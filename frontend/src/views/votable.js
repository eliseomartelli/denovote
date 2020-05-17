import { Utils } from "../utils.js";
import { NotFound } from "../views/notfound.js";
import { api } from "../config.js";
import { reload } from "../app.js";

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
                <h3>You're voting for:</h3>
                <h1>${votable?.text}</h1>
                <h4>Options:</h4>
                <form id="form">
                  ${votable.answers
                    .map((a) => {
                      return /*html*/ `
                      <input type="radio"
                              id="${a.id}"
                              name="response"
                              value="${a.id}">
                      <label for="${a.id}">${a.text} -> ${a.score}</label><br>
                    `;
                    })
                    .join("\n ")}
                  <br>
                  <input type="submit" value="Submit">
                </form>
      `;
    }
    return await NotFound.render();
  },
  after_render: async () => {
    document.getElementById("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const checked = document.querySelector('input[name="response"]:checked')
        .value;
      const request = Utils.parseRequestURL();
      fetch(api + "/votable/" + request.id + "/" + checked + "/vote", {
        method: "POST",
      });
      reload(document.getElementById("page_container"));
    });
  },
};

export { Votable };
