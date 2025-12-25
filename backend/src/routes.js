import { Router } from "express"
import { loginUserController } from "../src/modules/auth/auth.controller.js"
import { createUserController } from "../src/modules/users/user.controller.js"
import { authMiddleware } from "./middlewares/auth.middleware.js"

const routes = Router()

routes.post("/users", createUserController) // Create user

routes.post("/login", loginUserController) // Login

routes.get("/me", authMiddleware, (req, res) => { // Auth 
  return res.json({
    message: "Acessop permitido",
    userId: req.userId
  })
})

export { routes }

