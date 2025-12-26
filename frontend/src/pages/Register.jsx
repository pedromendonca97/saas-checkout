import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"

export default function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {

      await api.post("/users", { name, email, password })

      navigate("/")
    } catch (err) {
      setError("Erro ao criar conta")
    }
  }

  return (

    <form onSubmit={handleSubmit}>
      <h2>Criar conta</h2>

      {error && <p>{error}</p>}

      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button type="submit">Cadastrar</button>
    </form>

  )
}
