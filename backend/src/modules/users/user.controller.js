import { createUserService } from "./user.services.js"
import { success, error } from "../../utils/response.js"

async function createUserController(req, res) {

  try {

    await createUserService(req.body)

    return success(res, { message: "Usuário criado com sucesso!" }, 201)
  } catch (err) {
    return error(res, err.message)
  }
}

export { createUserController }
