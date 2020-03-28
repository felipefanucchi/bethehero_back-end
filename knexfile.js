// Update with your config settings.
const { NODE_ENV } = process.env || 'development';
const knex = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
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

module.exports = knex[NODE_ENV];
