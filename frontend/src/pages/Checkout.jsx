import { useEffect, useState } from "react"
import { api } from "../services/api"

export default function Checkout() {

  const [subscription, setSubscription] = useState(null)

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [plansResponse, subscriptionResponse] = await Promise.all([
          api.get("/plans"),
          api.get("/subscriptions/me")
        ]);

        setPlans(plansResponse.data.data)
        setSubscription(subscriptionResponse.data.data)
      } catch (err) {
        console.error("Erro ao carregar checkout", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await api.get("/plans")
        setPlans(response.data.data)
      } catch (err) {
        console.error("Erro ao carregar planos", err)
      } finally {
        setLoading(false)
      }
    }

    loadPlans()
  }, [])

  async function handleSubscribe(planId) {
    try {
      await api.post("/subscriptions", { planId })
      alert("Plano assinado com sucesso!")
    } catch (err) {
      alert("Erro ao assinar plano")
    }
  }

  return (
    <div>

      <h1>Checkout</h1>

      {/* SE JÁ TEM PLANO */}
      {subscription && (
        <div>
          <h2>Seu plano atual</h2>
          <p>Plano: {subscription.plan.name}</p>
          <p>Status: {subscription.status}</p>
          <p>Preço: R$ {subscription.plan.price}</p>
        </div>
      )}

      {/* SE NÃO TEM PLANO, MOSTRA CHECKOUT */}
      {!subscription && (
        <>
          {plans.length === 0 && <p>Nenhum plano disponível</p>}

          {plans.map((plan) => (
            <div key={plan.id}>
              <h3>{plan.name}</h3>
              <p>Preço: R$ {plan.price}</p>

              <button onClick={() => handleSubscribe(plan.id)}>
                Assinar
              </button>
            </div>
          ))}
        </>
      )}

    </div>

  );
}
