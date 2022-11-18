const pool = require('../utils/pool');

class Secret {
  id;
  title;
  description;
  createdAt;

  constructor({ id, title, description, created_at }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = created_at;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from secrets');
    return rows.map((row) => new Secret(row));
  }
}
module.exports = { Secret };
