import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../services/api"

export default function Dashboard() {
  const navigate = useNavigate()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSubscription() {
      try {
        const response = await api.get("/subscriptions/me")
        setSubscription(response.data?.plan ? response.data : null)
      } catch (err) {
        console.log("Erro ao buscar assinatura", err)
      } finally {
        setLoading(false)
      }
    }

    loadSubscription()
  }, [])

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/")
  }

  async function handleCancelSubscription() {
    const confirmCancel = window.confirm(
      "Tem certeza que deseja cancelar sua assinatura?"
    )
    if (!confirmCancel) return

    try {
      await api.patch("/subscriptions/cancel")
      alert("Assinatura cancelada com sucesso")
      setSubscription((prev) => ({ ...prev, status: "inactive" }))
    } catch (err) {
      alert("Erro ao cancelar assinatura")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        Carregando...
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-zinc-950 flex justify-center px-4 py-10"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}  
      exit={{ opacity: 0, y: -20 }}   
      transition={{ duration: 0.3 }}    
    >
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">
            Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-zinc-800 hover:bg-zinc-700 transition px-4 py-2 rounded-lg text-sm text-white"
          >
            Sair
          </button>
        </div>

        {/* CONTEÚDO */}
        {subscription ? (
          <>
            <h2 className="text-lg font-semibold text-white mb-4">
              Meu Plano
            </h2>

            <div className="space-y-4 mb-6">
              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-sm text-zinc-400">Plano</p>
                <p className="text-lg font-bold text-white">
                  {subscription.plan.name}
                </p>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-sm text-zinc-400">Status</p>
                <p
                  className={`text-lg font-bold ${subscription.status === "active"
                    ? "text-green-400"
                    : "text-yellow-400"
                    }`}
                >
                  {subscription.status}
                </p>
              </div>
            </div>

            {subscription.status === "active" && (
              <button
                onClick={handleCancelSubscription}
                className="w-full bg-red-500/10 border border-red-500/40 hover:bg-red-500/20 transition py-3 rounded-lg text-red-400 font-semibold"
              >
                Cancelar assinatura
              </button>
            )}

            {subscription.status !== "active" && (
              <Link to="/checkout">
                <button className="w-full bg-violet-600 hover:bg-violet-500 transition py-3 rounded-lg text-white font-semibold">
                  Renovar assinatura
                </button>
              </Link>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-zinc-400 mb-6">
              Você não possui assinatura ativa
            </p>

            <Link to="/checkout">
              <button className="bg-violet-600 hover:bg-violet-500 transition px-6 py-3 rounded-lg text-white font-semibold">
                Assinar um plano
              </button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}
