import { getAllPlans } from "./plan.repository.js"

async function getAllPlansController(req, res) {
  const plans = await getAllPlans()
  return res.json(plans)
}

export { getAllPlansController }
