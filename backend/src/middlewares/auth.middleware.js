import jwt from "jsonwebtoken"
import jwtConfig from "../config/jwt.js"

async function authMiddleware(req, res, next) {

  const authHeader = req.header.authorization
  if (!authHeader) return res.status(401).json({ error: "Token não informado" })

  const [, token] = authHeader.split(" ")

  try {
    
    const decoded = jwt.verify(token, jwtConfig.secret)

    req.userId = decoded.userId

    next()
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" })
  }

}