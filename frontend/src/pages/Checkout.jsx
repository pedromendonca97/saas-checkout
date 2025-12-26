import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"

export default function Checkout() {
  const [plans, setPlans] = useState([])
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      try {
        const [plansResponse, subscriptionResponse] = await Promise.all([
          api.get("/plans"),
          api.get("/subscriptions/me")
        ])

        setPlans(plansResponse.data || [])
        setSubscription(subscriptionResponse.data || null)
      } catch (err) {
        console.error("Erro ao carregar checkout", err)
        setPlans([])
        setSubscription(null)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const canChoosePlan = !subscription || subscription.status === "inactive"

  async function handleSubscribe(planId) {
    try {
      const response = await api.post("/subscriptions", { planId })
      alert("Plano assinado com sucesso!")
      setSubscription(response.data.data)

      // Redireciona para Dashboard após assinar
      navigate("/dashboard")
    } catch (err) {
      alert("Erro ao assinar plano")
    }
  }

  async function handleCancelSubscription() {
    const confirmCancel = window.confirm(
      "Tem certeza que deseja cancelar sua assinatura?"
    )
    if (!confirmCancel) return

    try {
      await api.patch("/subscriptions/cancel")
      alert("Assinatura cancelada com sucesso")
      setSubscription((prev) =>
        prev ? { ...prev, status: "inactive" } : null
      )
    } catch (err) {
      alert("Erro ao cancelar assinatura")
    }
  }

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <motion.div
      className="min-h-screen flex justify-center px-4 py-10"
      initial={{ opacity: 0, y: 20 }}  // inicia levemente abaixo e transparente
      animate={{ opacity: 1, y: 0 }}   // anima para posição normal
      exit={{ opacity: 0, y: -20 }}    // ao sair, vai levemente para cima e some
      transition={{ duration: 0.3 }}   // transição curta e suave
    >
      <div className="w-full max-w-5xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            Checkout
          </h1>

          <button onClick={handleLogout} className="btn-outline">
            Sair
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-zinc-400">Carregando...</p>
        )}

        {/* PLANO ATIVO */}
        {!loading && subscription?.status === "active" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-10">
            <h2 className="text-xl font-semibold mb-2">
              Seu plano atual
            </h2>

            <p className="text-zinc-400">
              Plano <span className="text-zinc-100 font-medium">
                {subscription.plan.name}
              </span>
            </p>

            <button
              onClick={handleCancelSubscription}
              className="btn-danger mt-6"
            >
              Cancelar assinatura
            </button>
          </div>
        )}

        {/* PLANOS */}
        {!loading && canChoosePlan && (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              {subscription ? "Renovar assinatura" : "Escolha seu plano"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => {
                const isRecommended = plan.name === "PRO"
                return (
                  <div
                    key={plan.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between
                           hover:border-violet-600 transition"
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {plan.name}
                      </h3>

                      <p className="text-zinc-400 mb-6">
                        Acesso completo à plataforma
                      </p>

                      <p className="text-4xl font-bold text-white">
                        R$ {plan.price}
                      </p>
                    </div>

                    <button
                      onClick={() => handleSubscribe(plan.id)}
                      className="btn-primary mt-8"
                    >
                      {subscription ? "Renovar" : "Assinar agora"}
                    </button>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
