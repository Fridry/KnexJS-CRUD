exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("projects").insert([
        { title: "Projeto X", user_id: 5 },
        { title: "Projeto Z", user_id: 6 },
      ]);
    });
};
