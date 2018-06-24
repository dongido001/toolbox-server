
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', function (table) {
        table.string('name', 90);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('categories')
};