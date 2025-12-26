import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "../services/api"

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault() // Não recarrega a página

    console.log("SUBMIT DISPARADO"); // TESTE

    try {

      const response = await api.post("/login", { email, password })

      const token = response.data.token

      localStorage.setItem("token", token)

      setError(""); // Limpa erro antigo

      navigate("/dashboard")
    } catch (err) {
      console.log("ERRO NO LOGIN:", err);
      console.log("RESPOSTA:", err.response?.data);
      setError("Email ou senha inválidos");
    }
  }

  return (

    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>

  )
}
