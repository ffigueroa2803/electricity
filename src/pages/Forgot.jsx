import React, { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { Error } from "../components"

const Forgot = () => {

  const { currentColor } = useSelector((state) => state?.theme)

  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
  }

  return (
    <div className="max-w-[650px] px-10 py-20 rounded-2xl">
      <h1 className="text-3xl font-semibold">¿Olvidaste tu contraseña?</h1>
      <p className="font-medium text-base text-gray-500 mt-4">
        Ingrese la dirección de correo electrónico asociada con su cuenta y le enviaremos un enlace para restablecer su contraseña.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="mt-8">

          {/* Email */}
          <div>
            <label className="font-medium text-base">Dirección de correo electrónico</label>
            <input
              id="email"
              className="w-full border-2 border-gray-100 rounded-md p-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Button */}
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-md text-white"
              style={{ backgroundColor: currentColor }}
            >
              Restablecer la contraseña
            </button>

            <NavLink
              to="/login"
              className="py-3 rounded-md justify-center text-center"
              style={{ color: currentColor }}
            >
              Atrás para iniciar sesión
            </NavLink>
          </div>

        </div>

        {error !== "" && <Error message={error} />}

      </form>
    </div>
  )
}

export default Forgot