import { useEffect, useState } from "react"
import { api } from "../services/api"

export default function Dashboard() {

  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSubscription() {

      try {

        const response = await api.get("/subscription/me")
        setSubscription(response.data.data ?? null)
      } catch (err) {
        console.log("Erro ao buscar assinatura", err)
      } finally {
        setLoading(false)
      }
    }

    loadSubscription()
  }, [])

  if (loading) return <p>Carregando...</p>

  if (!subscription) {
    return <p>Você não possui assinatura ativa</p>
  }

  return (

    <div>

      <h2>Meu Plano</h2>

      <p>Plano: {subscription.plan.name}</p>
      <p>Status: {subscription.status}</p>

    </div>

  )
}
