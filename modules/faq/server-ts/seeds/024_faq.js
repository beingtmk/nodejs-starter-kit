import { returnId, truncateTables } from "@gqlapp/database-server-ts";
exports.seed = async function(knex) {
  await truncateTables(knex, Promise, ["faq"]);

  await Promise.all(
    [...Array(50).keys()].map(async (i) => {
      const date = Math.round(Math.random() * (27 - 1) + 1);
      const month = Math.round(Math.random() * (11 - 1) + 1);

      return returnId(knex("faq")).insert({
        question: `${i} What is Lorem Ipsum?`,
        answer: `${i} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        is_featured: i % 3 === 0,
      });
    })
  );
};
