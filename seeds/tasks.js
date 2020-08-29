exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { id: 1, name: 'Create endpoints' },
        { id: 2, name: 'Create route files' },
        { id: 3, name: 'Create model files' },
      ]);
    });
};
