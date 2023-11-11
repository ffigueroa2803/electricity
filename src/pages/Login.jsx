import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

import { useLoginMutation } from "../features/auth/authApi";
import { themeSetIsClicked } from "../features/theme/themeSlice";

export const Login = () => {
  const navigate = useNavigate();
  const { currentColor } = useSelector((state) => state?.theme);

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    await login({ username, password });
  };

  const changeIconPassword = () => {
    let x = document.getElementById("password");

    if (x.type === "password") {
      x.type = "text";
      setShow(false);
    } else {
      x.type = "password";
      setShow(true);
    }
  };

  useEffect(() => {
    if (responseError) {
      if (responseError?.data?.errors) {
        toast.error(JSON.stringify(responseError?.data?.errors));
      } else {
        toast.error(JSON.stringify(responseError?.data?.message));
      }
    }

    if (data?.accessToken) {
      dispatch(themeSetIsClicked());
      navigate("/authorized/profile", { replace: true });
    }
  }, [data, responseError, navigate]);

  return (
    <div className="max-w-[650px] px-10 py-20 rounded-2xl">
      <h1 className="text-3xl font-semibold">Inicio de sessión</h1>
      <p className="font-medium text-base text-gray-500 mt-4">
        ¡Bienvenido de nuevo! Por favor, ingrese la dirección de correo
        electrónico asociada con su cuenta.
      </p>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="mt-8">
          {/* Email */}
          <div>
            <label className="font-medium text-base">
              Dirección de correo electrónico
            </label>
            <input
              id="email"
              className="w-full border-2 border-gray-100 rounded-md p-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Introduce tu correo electrónico"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Password */}
          <div className="mt-4">
            <label className="font-medium text-base">Contraseña</label>
            <input
              id="password"
              className="w-full border-2 border-gray-100 rounded-md p-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <div></div>
              {show ? (
                <BsEyeSlash
                  className="text-2xl mt-[-60px] mr-[20px]"
                  onClick={() => changeIconPassword()}
                />
              ) : (
                <BsEye
                  className="text-2xl mt-[-60px] mr-[20px]"
                  onClick={() => changeIconPassword()}
                />
              )}
            </div>
          </div>
          {/* Button */}
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-md text-white"
              disabled={isLoading}
              style={{ backgroundColor: currentColor }}
            >
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </div>
        </div>
        {/* Toast */}
        <Toaster position="top-right" />
      </form>
    </div>
  );
};
