
exports.up = function(knex, Promise) {
    return knex.schema.createTable('links', function (table) {
        table.increments('id');
        table.string('url');
        table.json('link_details');

        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('links')
};
