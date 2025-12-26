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

async function findSubscriptionWithPlanByUser(userId) {
  const [rows] = await db.query(`
    SELECT
      s.id AS subscription_id,
      s.status,
      s.created_at,
      p.id AS plan_id,
      p.name AS plan_name,
      p.price AS plan_price
    FROM subscriptions s
    JOIN plans p ON p.id = s.plan_id
    WHERE s.user_id = ?
    ORDER BY s.created_at DESC
    LIMIT 1
    `, [userId])

  return rows[0]
}

async function cancelSubscription(id) {
  await db.query(`UPDATE subscriptions SET status = "inactive" WHERE id = ?`, [id])
}

export {
  findActiveSubscriptionByUser,
  createSubscription,
  deactivateSubscription,
  findSubscriptionWithPlanByUser,
  cancelSubscription
}
