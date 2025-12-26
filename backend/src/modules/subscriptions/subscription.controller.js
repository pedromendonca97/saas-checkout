import { subscribeUser, getMySubscription } from "../subscriptions/subscription.services.js"

async function subscribeUserController(req, res) {

  try {

    const userId = req.userId
    const { planId } = req.body

    await subscribeUser({ userId, planId })

    return res.status(201).json({ message: "Assinatura ativa" })    
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }

}

async function getMySubscriptionController(req, res) {

  const userId = req.userId

  const subscription = await getMySubscription(userId)
  if (!subscription) {
    return res.json({ subscription: null })
  }

  return res.json(subscription)
}

export { subscribeUserController, getMySubscriptionController }
