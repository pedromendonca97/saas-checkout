import { Router } from "express"

const routes = Router()

routes.post("/users", () => {
  console.log("Ok!")
})

export { routes }
