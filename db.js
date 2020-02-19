const spicedPg = require("spiced-pg");

const db = spicedPg(
  process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/plantme"
);

exports.addUser = function(first, last, email, password) {
  return db.query(
    `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4) RETURNING id`,
    [first, last, email, password]
  );
};

exports.getUser = function(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

exports.addGarden = function(user_id, picture, name) {
  return db.query(
    `INSERT INTO garden (user_id, picture, name)
        VALUES ($1, $2, $3) RETURNING *`,
    [user_id, picture, name]
  );
};

exports.getGarden = function(user_id) {
  return db
    .query(`SELECT picture, name, created_at FROM garden WHERE user_id = $1`, [
      user_id
    ])
    .then(({ rows }) => rows);
};
