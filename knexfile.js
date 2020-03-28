// Update with your config settings.
const knex = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: __dirname+ '/src/database/db.sqlite'
    },  
    useNullAsDefault: true,
    migrations: {
      directory: __dirname+ '/src/database/migrations'
    },
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
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname+ '/src/database/migrations'
    },
    pool: {
      min: 2,
      max: 10
    },
  }
};

module.exports = knex;
