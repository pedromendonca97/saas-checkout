import { subscribeUser, getMySubscription, cancelSubscriptionService } from "../subscriptions/subscription.services.js"

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

async function cancelSubscriptionController(req, res) {

  try {
    
    const userId = req.userId

    await cancelSubscriptionService(userId)
    
    return res.json({ message: "Assinatura cancelada com sucesso!" })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }

}

export { subscribeUserController, getMySubscriptionController, cancelSubscriptionController }
