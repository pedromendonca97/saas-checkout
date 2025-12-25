import { createUser, findUserByEmail } from "./user.repository.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

async function createUserService({ name, email, password }) {

  const userExists = await findUserByEmail(email)

  if (userExists) {
    return res.json("Email já cadastrado")
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await createUser({
    id: uuid(),
    name,
    email,
    password: passwordHash
  })
}

export { createUserService }
