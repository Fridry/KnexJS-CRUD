exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("songs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("songs").insert([
        { name: "I Am The Best", artist: "2NE1" },
        { name: "Umbrella", artist: "Rihanna" },
      ]);
    });
};
