exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('resources')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        { id: 1, name: 'projector 1', description: 'a resource for a project' },
        {
          id: 2,
          name: 'conference room 1',
          description: 'a resource for a project',
        },
        {
          id: 3,
          name: 'television 1',
          description: 'a resource for a project',
        },
      ]);
    });
};
