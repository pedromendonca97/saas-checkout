import { v4 as uuid } from "uuid"
import { findActiveSubscriptionByUser, createSubscription, deactivateSubscription } from "./subscription.repository.js"
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

export { subscribeUser }
