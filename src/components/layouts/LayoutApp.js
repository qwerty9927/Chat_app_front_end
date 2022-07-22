import { useSelector } from "react-redux"
import clsx from "clsx"

//My import
import style from "./css/layoutApp.module.scss"
import SideBar from "../ui/sideBar/SideBar"
import ShowMenu from "../ui/menu/ShowMenu"
import ShowContainer from "../ui/container/ShowContainer"
import { selectStateContainer } from "../features/container/containerSlice"

function LayoutApp() {
  const state = useSelector(selectStateContainer)

  console.log(state.showContainer)
  return (
    <div className={style.layoutApp}>
      <div className={style.sideBar}>
        <SideBar />
      </div>
      <div className={
        clsx(
          style.menu, {
            [style.displayMenu]: !state.showContainer,
            [style.unDisplayMenu]: state.showContainer
          }
        )
      }>
        <ShowMenu />
      </div>
      <div className={
        clsx(
          style.container, {
            [style.displayContainer]: state.showContainer,
            [style.unDisplayContainer]: !state.showContainer
          }
        )
      }>
        <ShowContainer />
      </div>
    </div>
  )
}
export default LayoutApp

 {/* <div className={
          `${style.subContainer} ${state.showContainer ? style.displayContainer : style.unDisplayContainer}`
        }></div> */}