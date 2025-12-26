import db from "../../config/database.js"

async function findActiveSubscriptionByUser(userId) {

  const [rows] = await db.query(`SELECT * FROM subscriptions WHERE user_id = ? AND status = "active"`, [userId])

  return rows[0]
}

async function createSubscription(data) {

  const { id, userId, planId } = data

  await db.query(`INSERT INTO subscriptions (id, user_id, plan_id, status) VALUES (?, ?, ?, "active")`, [id, userId, planId])
}

async function deactivateSubscription(id) {
  
  await db.query(`UPDATE subscriptions SET status = "inactive" WHERE id = ?`, [id])

}

export { findActiveSubscriptionByUser, createSubscription, deactivateSubscription }
