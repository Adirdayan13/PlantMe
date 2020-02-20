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
        VALUES ($1, $2, $3) RETURNING id, user_id, picture, name`,
    [user_id, picture, name]
  );
};

exports.getGarden = function(user_id) {
  return db
    .query(
      `SELECT id, picture, name, shade, drought, moisture, bloom, growth, common_name, created_at FROM garden
      WHERE user_id = $1 ORDER BY id DESC`,
      [user_id]
    )
    .then(({ rows }) => rows);
};

exports.deleteGarden = function(id) {
  return db.query(`DELETE FROM garden WHERE id = $1`, [id]);
};

exports.updateGarden = function(
  id,
  shade,
  drought,
  moisture,
  bloom,
  growth,
  common_name
) {
  return db.query(
    `UPDATE garden SET shade = $2, drought = $3, moisture = $4, bloom = $5, growth = $6, common_name = $7
    WHERE id = $1`,
    [id, shade, drought, moisture, bloom, growth, common_name]
  );
};

exports.updateGardenName = function(id, name) {
  return db
    .query(`UPDATE garden SET name = $2 WHERE id = $1 RETURNING *`, [id, name])
    .then(({ rows }) => rows);
};

exports.addGuest = function(guest) {
  return db
    .query(`INSERT INTO guests (guest) VALUES ($1) RETURNING id`, [guest])
    .then(({ rows }) => rows);
};
