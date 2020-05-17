import { Utils } from "../utils.js";
import { NotFound } from "../views/notfound.js";

let votables = [
  { id: 0, title: "Hello, world!" },
  { id: 1, title: "Classic." },
];

let Votable = {
  render: async () => {
    let request = Utils.parseRequestURL();
    let votable = votables.find((e) => {
      return e.id == request.id;
    });
    if (votable) {
      return /*html*/ `
                ${votable?.title}
            `;
    }
    return await NotFound.render();
  },
};

export { Votable };
