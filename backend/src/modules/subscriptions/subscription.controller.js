import { subscribeUser, getMySubscription, cancelSubscriptionService } from "../subscriptions/subscription.services.js"
import { success, error } from "../../utils/response.js"

async function subscribeUserController(req, res) {

  try {

    const userId = req.userId
    const { planId } = req.body

    await subscribeUser({ userId, planId })

    return success(res, { message: "Assinatura ativa" }, 201) // Helper de resposta   
  } catch (err) {
    return error(res, err.message)
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
    
    return success(res, { message: "Assinatura cancelada com sucesso" }, 200)
  } catch (err) {
    return error(res, err.message)
  }

}

export { subscribeUserController, getMySubscriptionController, cancelSubscriptionController }
