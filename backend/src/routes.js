import { Router } from "express"
import { loginUserController } from "../src/modules/auth/auth.controller.js"
import { createUserController } from "../src/modules/users/user.controller.js"
import { authMiddleware } from "./middlewares/auth.middleware.js"
import { getAllPlansController } from "./modules/plans/plan.controller.js"
import { subscribeUserController, getMySubscriptionController, cancelSubscriptionController } from "./modules/subscriptions/subscription.controller.js"

const routes = Router()

routes.post("/users", createUserController) // Create user

routes.post("/login", loginUserController) // Login

routes.post("/subscriptions", authMiddleware, subscribeUserController) // Subscription

routes.get("/subscriptions/me", authMiddleware, getMySubscriptionController) // Subscription/me

routes.get("/me", authMiddleware, (req, res) => { // Auth 
  return res.json({
    message: "Acessop permitido",
    userId: req.userId
  })
})

routes.get("/plans", getAllPlansController) // Plans list

routes.patch("/subscriptions/cancel", authMiddleware, cancelSubscriptionController) // Change subscription status

export { routes }

