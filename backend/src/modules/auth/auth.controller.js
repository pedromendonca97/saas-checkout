import { loginUser } from "./auth.services"

async function loginUserController(req, res) {

  try {

    const token = await loginUser(req.body)

    return res.json({ token })
  } catch (err) {
    return res.status(401).json({ error: err.message })
  }

}

export { loginUserController }
