// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: __dirname+ '/src/database/db.sqlite'
    },
    migrations: {
      directory: __dirname+ '/src/database/migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname+ '/src/database/migrations'
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
  }

};
