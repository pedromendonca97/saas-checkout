import db from "../../config/database.js"

async function createUser(newUser) {

  const { id, name, email, password } = newUser

  await db.query(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`, [id, name, email, password])

}

async function findUserByEmail(email) {

  const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email])

  return rows[0]
}

export { createUser, findUserByEmail }
