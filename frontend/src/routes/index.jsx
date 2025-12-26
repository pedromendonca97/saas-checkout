import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import PrivateRoute from "../routes/PrivateRoute"
import Checkout from "../pages/Checkout"
import Register from "../pages/Register"

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}
