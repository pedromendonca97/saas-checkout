import { v4 as uuid } from "uuid"
import {
  findActiveSubscriptionByUser,
  createSubscription,
  deactivateSubscription,
  findSubscriptionWithPlanByUser,
  cancelSubscription
} from "./subscription.repository.js"
import { findPlanById } from "../plans/plan.repository.js"

async function subscribeUser({ userId, planId }) {

  const plan = await findPlanById(planId)
  if (!plan) throw new Error("Plano inexistente")

  const activeSubscription = await findActiveSubscriptionByUser(userId)
  if (activeSubscription) {
    await deactivateSubscription(activeSubscription.id)
  }

  await createSubscription({
    id: uuid(),
    userId,
    planId
  })
}

async function getMySubscription(userId) {

  const subscription = await findSubscriptionWithPlanByUser(userId)
  if (!subscription) {
    return null
  }

  return {
    status: subscription.status,
    since:subscription.created_at,
    plan: {
      id: subscription.plan_id,
      name: subscription.plan_name,
      price: subscription.plan_price
    }
  }
}

async function cancelSubscriptionService(userId) {

  const activeSubscription = await findActiveSubscriptionByUser(userId)
  if (!activeSubscription) {
    throw new Error("Usuário não possui assinatura ativa")
  }

  await cancelSubscription(activeSubscription.id)
}

export { subscribeUser, getMySubscription, cancelSubscriptionService }
