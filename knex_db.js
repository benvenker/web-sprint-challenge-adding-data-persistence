exports.up = async function (knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments('id');
      tbl.text('name', 256).notNullable();
      tbl.text('description', 256);
      tbl.boolean('completed').defaultTo(false);
    })
    .createTable('tasks', tbl => {
      tbl.increments('id');
      tbl.text('name', 256).notNullable();
      tbl.text('notes', 256);
      tbl
        .int('project_id')
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.boolean('completed').defaultTo(false);
    })
    .createTable('resources', tbl => {
      tbl.increments('id');
      tbl.text('name', 256).notNullable();
      tbl.text('description', 256);
    })
    .createTable('projects_tasks', tbl => {
      tbl
        .int('project_id')
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .int('task_id')
        .notNullable()
        .references('id')
        .inTable('tasks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('projects_resources', tbl => {
      tbl
        .int('project_id')
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .int('resource_id')
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = async function (knex) {
  knex.schema.dropTable('projects');
  knex.schema.dropTable('tasks');
  knex.schema.dropTable('resources');
  knex.schema.dropTable('projects_tasks');
  knex.schema.dropTable('projects_resources');
};
