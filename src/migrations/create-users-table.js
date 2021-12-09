exports.up = knex => {
  return knex.schema.createTable('User', table => {
    table.increments('id').primary()
    table.string('firstName')
    table.string('surname')
    table.string('picture').nullable()
    table.enum('roles', ['USER', 'AUTHOR', 'ADMIN'])
    table.string('email')
    table.string('password')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('User')
}
