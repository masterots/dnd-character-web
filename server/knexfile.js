module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: '../dnd-players-guide-53.db'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'example'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
