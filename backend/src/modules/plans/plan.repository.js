import db from "../../config/database.js"

async function getAllPlans() {
  const [rows] = await db.query(`SELECT * FROM plans`)

  return rows
}

async function findPlanById(id) {
  const [rows] = await db.query(`SELECT * FROM plans WHERE id = ?`, [id])

  return rows[0]
}

export { getAllPlans, findPlanById }
