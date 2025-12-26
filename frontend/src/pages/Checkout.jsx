import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Checkout() {
  const [plans, setPlans] = useState([]); // ⚠️ começa como array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await api.get("/plans");
        setPlans(response.data.data);
      } catch (err) {
        console.error("Erro ao carregar planos", err);
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, []);

  async function handleSubscribe(planId) {
    try {
      await api.post("/subscriptions", { planId });
      alert("Plano assinado com sucesso!");
    } catch (err) {
      alert("Erro ao assinar plano");
    }
  }

  return (
    <div>
      <h1>Planos disponíveis</h1>

      {loading && <p>Carregando...</p>}

      {!loading && plans.length === 0 && (
        <p>Nenhum plano disponível</p>
      )}

      {!loading &&
        plans.map((plan) => (
          <div key={plan.id}>
            <h3>{plan.name}</h3>
            <p>Preço: R$ {plan.price}</p>

            <button onClick={() => handleSubscribe(plan.id)}>
              Assinar
            </button>
          </div>
        ))}
    </div>
  );
}
