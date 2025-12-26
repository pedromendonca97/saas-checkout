import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubscription() {
      try {
        const response = await api.get("/subscriptions/me");
        setSubscription(response.data.data ?? null);
      } catch (err) {
        console.log("Erro ao buscar assinatura", err);
      } finally {
        setLoading(false);
      }
    }

    loadSubscription();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (loading) return <p>Carregando...</p>;

  return (

    <div>
      <button onClick={handleLogout}>Sair</button>

      {!subscription ? (
        <p>Você não possui assinatura ativa</p>
      ) : (
        <>
          <h2>Meu Plano</h2>
          <p>Plano: {subscription.plan.name}</p>
          <p>Status: {subscription.status}</p>
        </>
      )}
    </div>

  );
}
