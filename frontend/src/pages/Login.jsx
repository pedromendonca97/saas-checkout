import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await api.post("/login", { email, password })
      const token = response.data.data.token
      localStorage.setItem("token", token)

      setError("")
      navigate("/dashboard")
    } catch (err) {
      setError("Email ou senha inválidos")
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-zinc-950 flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">

        {/* TÍTULO */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Entrar na plataforma
          </h2>
          <p className="text-zinc-400 mt-2">
            Acesse sua conta para continuar
          </p>
        </div>

        {/* ERRO */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 transition rounded-lg py-3 font-semibold text-white"
          >
            Entrar
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Não tem conta?{" "}
          <a
            href="/register"
            className="text-violet-500 hover:underline"
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </motion.div>
  )
}
