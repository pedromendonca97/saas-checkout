import { loginUser } from "./auth.services.js"
import { error } from "../../utils/response.js"

async function loginUserController(req, res) {

  try {

    const token = await loginUser(req.body)

    return res.json({ token })
  } catch (err) {
    return error(res, err.message)
  }

}

export { loginUserController }
