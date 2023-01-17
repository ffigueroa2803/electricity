import React from "react"
import { Switch } from "@headlessui/react"

const Toggle = ({ conditional, type, getValueToggle, currentColor }) => {

  let content

  if (type === "state")
    content = <p>{conditional ? "Activo" : "Inactivo"}</p>
  else
    content = <p>{conditional ? "Administrator" : "Colaborador"}</p>


  return (
    <div className="flex flex-row py-2 items-center gap-x-4">
      <Switch
        checked={conditional}
        onClick={() => getValueToggle(type, conditional)}
        style={{ backgroundColor: conditional ? currentColor : "#9CA3AF" }}
        className="relative inline-flex h-[26px] w-[62px] shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white 
          focus-visible:ring-opacity-75"
      >
        <span
          aria-hidden="true"
          className={`${conditional ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 
            transition duration-200 ease-in-out`}
        />
      </Switch>
      {content}
    </div>
  )
}

export default Toggle
