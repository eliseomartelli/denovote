import { api } from "../config.js";

let getVotables = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(api + "/votable", options);
    return await response.json();
  } catch (err) {
    console.log("Error", err);
  }
  return;
};

let Home = {
  render: async () => {
    let votables = await getVotables();

    if (votables) {
      return /*html*/ `
      <h1>Latest Votables:</h1>
      ${votables
        .map((v) => {
          return /*html*/ `
              <a style="text-decoration: none" href="/#/votable/${v._id.$oid}">
                  <div class="card">
                      <h3>${v.text}</h3>
                  </div>
              </a>
          `;
        })
        .join("\n")}
      <a href="/#/add" class="fab">+</a>
      `;
    } else {
      return /*html*/ `
        <h3>Try later, pls :(</h3>
      `;
    }
  },
};

export { Home };
