const pool = require("../config/database");

async function create(user) {
  const query = `
    INSERT INTO users (name)
    VALUES ($1)
    RETURNING id, name
  `;

  const values = [user.name];

  const result = await pool.query(query, values);

  return result.rows[0];
}


async function getAll() {
  const result = await pool.query(`
    SELECT id, name FROM users ORDER BY id
  `);
  return result.rows;
}

async function getById(id) {
  const result = await pool.query(
    `SELECT id, name FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

async function update(id, user) {
  const result = await pool.query(
    `
    UPDATE users
    SET name = $1
    WHERE id = $2
    RETURNING id, name
    `,
    [user.name, id]
  );
  return result.rows[0] || null;
}

async function remove(id) {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING id`,
    [id]
  );
  return result.rows[0] || null;
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};
