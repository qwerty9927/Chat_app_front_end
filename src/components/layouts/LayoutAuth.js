import { Outlet } from 'react-router-dom'
import style from './css/layoutAuth.module.scss'
export default function LayoutAuth(){
  return (
    <div className={style.auth}>
      <Outlet />
    </div>
  )
}