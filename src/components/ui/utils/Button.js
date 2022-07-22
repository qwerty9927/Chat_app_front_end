import { useState } from "react"
import clsx from "clsx"
import style from "./css/button.module.scss"

function Button({ children, active , onClick }){
  return (
    <button className={clsx(style.btn, {[style.active]: active})} onClick={onClick}>
      <div className={style.wrapIcon}>
        {children}
      </div>
    </button>
  )
}

export default Button