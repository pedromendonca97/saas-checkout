import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { findUserByEmail } from "../users/user.repository.js"
import jwtConfig from "../../config/jwt.js"

async function loginUser({ email, password }) {

  const user = await findUserByEmail(email)
  if (!user) throw new Error("Email ou senha inválidos")

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error("Email ou senha inválidos")

  const token = jwt.sign(
    { userId: user.id },
    jwtConfig,
    { expiresIn: jwtConfig.expiresIn }
  )

  return token
}

export { loginUser }