exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id')
        table.string('username', 90).unique();
        table.string('password').unique();
        table.string('email').unique();
        table.string('token');
        table.string('name');

        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};
