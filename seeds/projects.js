exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          id: 1,
          name: 'Node db 1',
          description: 'test data',
          completed: false,
        },
        {
          id: 2,
          name: 'Node db 2',
          description: 'test data',
          completed: false,
        },
        {
          id: 3,
          name: 'Node db 3',
          description: 'test data',
          completed: false,
        },
      ]);
    });
};
