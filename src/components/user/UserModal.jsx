import React, { useCallback, useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { Toggle } from "../../components";
import { useRegisterUpdateUserMutation } from "../../features/user/userApi";
import {
  userClearInit,
  userToggleChecked,
} from "../../features/user/userSlice";
import { MdOutlineCancel } from "react-icons/md";

const UserModal = ({
  open,
  setOpened,
  control,
  user,
  typeAction,
  setDataInput,
  toast,
}) => {
  const id = user?.id || null;

  const { currentColor } = useSelector((state) => state?.theme);
  const { page, limit, toggle } = useSelector((state) => state?.user);

  const dispatch = useDispatch();

  const [show, setShow] = useState(true);

  // data to save
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [registerUpdateUser, { data, isLoading, error: responseError }] =
    useRegisterUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let state = toggle?.state;
    let isAdmin = toggle?.isAdmin;
    let password = pass === "" ? user?.password : pass;
    try {
      await registerUpdateUser({
        id,
        email,
        password,
        state,
        isAdmin,
        page,
        limit,
        typeAction,
      });
      setDataInput("");
    } catch (error) {
      toast.error(error);
    }
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

  const getValueToggle = (type, value) => {
    if (type === "state") {
      dispatch(userToggleChecked({ type: "state", value: !value }));
    } else {
      dispatch(userToggleChecked({ type: "isAdmin", value: !value }));
    }
  };

  const changeTypeAction = useCallback(() => {
    if (typeAction === "edit") {
      setEmail(user?.email);
      dispatch(userToggleChecked({ type: "state", value: user?.state }));
      dispatch(userToggleChecked({ type: "isAdmin", value: user?.isAdmin }));
    } else {
      setEmail("");
      setPass("");
      dispatch(userToggleChecked({ type: "state", value: false }));
      dispatch(userToggleChecked({ type: "isAdmin", value: false }));
    }
  }, [typeAction, user, dispatch]);

  useEffect(() => {
    changeTypeAction();
  }, [changeTypeAction]);

  useEffect(() => {
    if (responseError) {
      if (responseError?.data?.errors)
        toast.error(JSON.stringify(responseError?.data?.errors));
      else toast.error(JSON.stringify(responseError?.data?.message));
    } else if (data) {
      if (typeAction === "edit") {
        setEmail(data?.email);
        dispatch(userToggleChecked({ type: "state", value: data?.state }));
        dispatch(userToggleChecked({ type: "isAdmin", value: data?.isAdmin }));
        toast.success("Usuario editado correctamente!");
      } else {
        toast.success("Usuario creado correctamente!");
        dispatch(userClearInit());
      }
    }
  }, [data, responseError]);

  return (
    open && (
      <>
        <div className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer" />
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/3 left-1/2 z-20 -translate-x-1/2 -translate-y-1/3">
          <div className="flex justify-between items-center">
            <h1 className="text-center text-3xl font-extrabold text-gray-900 align-middle">
              {typeAction === "edit" ? "EDITAR USUARIO" : "NUEVO USUARIO"}
            </h1>
            <button
              type="button"
              onClick={control}
              style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />
            </button>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              {/* Email */}
              <div>
                <label className="font-medium text-lg">Email</label>
                <input
                  id="email"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* Password */}
              <div className="mt-4">
                <label className="font-medium text-lg">Password</label>
                <input
                  id="password"
                  className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required={typeAction === "edit" ? false : true}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <div></div>
                  {show ? (
                    <BsEyeSlash
                      className="text-2xl mt-[-43px] mr-[20px]"
                      onClick={() => changeIconPassword()}
                    />
                  ) : (
                    <BsEye
                      className="text-2xl mt-[-43px] mr-[20px]"
                      onClick={() => changeIconPassword()}
                    />
                  )}
                </div>
              </div>
              {/* Toggle status */}
              <div className="mt-4">
                <Toggle
                  conditional={toggle?.state}
                  type="state"
                  getValueToggle={getValueToggle}
                  currentColor={currentColor}
                />
              </div>
              {/* Toggle isAdmin */}
              <div className="mt-4">
                <Toggle
                  conditional={toggle?.isAdmin}
                  type="isAdmin"
                  getValueToggle={getValueToggle}
                  currentColor={currentColor}
                />
              </div>
              {/* Button */}
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-md text-white font-bold"
                  disabled={isLoading}
                  style={{ backgroundColor: currentColor }}
                >
                  {isLoading ? "...Procesando" : "Guardar datos"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default UserModal;
