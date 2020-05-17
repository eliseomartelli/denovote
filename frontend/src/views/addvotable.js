import { reload } from "../app.js";
import { api } from "../config.js";

let votable = {
  text: "",
  answers: [
    { id: 0, text: "", score: 0 },
    { id: 1, text: "", score: 0 },
  ],
};

let AddVotable = {
  render: async () => {
    return /*html*/ `
            <h1>Add a new Votable</h1>
            <form id="form">
              <label for="title">Title:</label>
              <input type="text" name="title"><br>
              <h3>Answers:</h3>
              ${votable.answers
                .map((a) => {
                  return /*html*/ `
                  <label for="a-${a.id}">A ${a.id + 1}:</label>
                  <input type="text" id="a-${a.id}"><br>
                `;
                })
                .join("\n")}
              <br>
              <input type="submit" value="Submit">
              <button type="button" id="add-answer">Add Answer</button>
            </form>
        `;
  },
  after_render: async () => {
    document.getElementById("add-answer").addEventListener("click", (e) => {
      const nextId = votable.answers.length;
      votable.answers.push({ id: nextId, text: "", score: 0 });
      console.log(votable);
      reload(document.getElementById("page_container"));
    });
    document.getElementById("form").addEventListener("submit", async (e) => {
      e.preventDefault();
      votable.text = document.querySelector("input[name=title]").value;
      votable.answers.forEach((a) => {
        a.text = document.getElementById("a-" + a.id).value;
      });
      await fetch(api + "/votable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(votable),
      }).then(async (data) => {
        const newID = await data.json();
        window.location.href = "/#/votable/" + newID.$oid;
      });
    });
  },
};

export { AddVotable };
