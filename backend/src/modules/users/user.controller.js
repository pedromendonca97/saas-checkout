import { createUserService } from "./user.services.js"

async function createUserController(req, res) {

  try {

    await createUserService(req.body)
    
    return res.status(201).json({ message: "Usuário criado com sucesso!" })
  } catch (err) {
    return res.status(400).json({ message: "Não foi possível criar usuário", err })
  }
}

export { createUserController }

