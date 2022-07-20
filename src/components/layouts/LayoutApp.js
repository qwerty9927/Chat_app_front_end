import { useState } from "react"
import style from "./css/layoutApp.module.scss"
import SideBar from "../ui/sideBar/SideBar"
import ShowMenu from "../ui/menu/ShowMenu"

function LayoutApp() {
  // const [isDisplayContainer, setIsDisplayContainer] = useState(false)
  // console.log(isDisplayContainer)
  return (
    <div className={style.layoutApp}>
      <SideBar className={style.sideBar} />
      <ShowMenu className={style.menu} />
      {/* <div className={style.menu}>
        <div className={
          `${style.subContainer} ${isDisplayContainer ? style.displayContainer : style.unDisplayContainer}`
        }></div>
      </div> */}
      <div className={style.container}></div>
    </div>
  )
}
export default LayoutApp