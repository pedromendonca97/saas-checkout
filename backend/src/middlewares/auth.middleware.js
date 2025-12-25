import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

function authMiddleware(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token ausente" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

export { authMiddleware }
