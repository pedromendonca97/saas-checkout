import { useEffect, useState } from "react"
import { api } from "../services/api"

export default function Checkout() {
  const [plans, setPlans] = useState([])
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <div>
      <h1>Checkout</h1>

      {loading && <p>Carregando...</p>}

      {!loading && subscription?.status === "active" && (
        <>
          <h2>Seu plano atual</h2>
          <p>Plano: {subscription.plan.name}</p>
          <p>Status: {subscription.status}</p>
          <p>Você já possui um plano ativo.</p>
        </>
      )}

      {!loading && canChoosePlan && (
        <>
          <h2>
            {subscription
              ? "Renovar plano"
              : "Escolha um plano"}
          </h2>

          {plans.length === 0 && <p>Nenhum plano disponível</p>}

          {plans.map((plan) => (
            <div key={plan.id}>
              <h3>{plan.name}</h3>
              <p>Preço: R$ {plan.price}</p>

              <button onClick={() => handleSubscribe(plan.id)}>
                {subscription ? "Renovar" : "Assinar"}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
