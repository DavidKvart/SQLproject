const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "courses",
  password: "1136896",
  port: 5432,
});

client.connect();

module.exports = client;
