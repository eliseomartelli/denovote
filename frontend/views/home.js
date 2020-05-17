let votables = [
  { id: 0, title: "Hello, world!" },
  { id: 1, title: "Classic." },
  { id: 2, title: "Lorem ipsum" },
  { id: 0, title: "Hello, world!" },
  { id: 1, title: "Classic." },
  { id: 2, title: "Lorem ipsum" },
  { id: 3, title: "Yee." },
  { id: 3, title: "Yee." },
];

let Home = {
  render: async () => {
    return /*html*/ `
            <h1>Latest Votables:</h1>
            ${votables
              .map((v) => {
                return /*html*/ `
                    <a style="text-decoration: none" href="/#/votable/${v.id}">
                        <div class="card">
                            <h3>${v.title}</h3>
                        </div>
                    </a>
                `;
              })
              .join("\n")}
            <a href="/#/add" class="fab">+</a>
        `;
  },
};

export { Home };
