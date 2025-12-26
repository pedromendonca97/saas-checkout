import "dotenv/config"
import express from "express"
import cors from "cors"
import { routes } from "./routes.js"

const app = express()
const PORT = process.env.PORT

app.use(cors({ origin: "http://localhost:5555" }))

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${ PORT }`)
})
