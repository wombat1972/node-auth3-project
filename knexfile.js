// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/users2.db3"
    }
  },

  migrations: {
    directory: "./migrations"
  }
};
