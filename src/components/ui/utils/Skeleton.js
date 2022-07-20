import clsx from 'clsx'
import style from './css/skeleton.module.scss'

function Skeleton({type}){
  switch(type){
    case "avatar": 
      return (
        <div className={clsx(style.skeleton_avatar, style.skeleton)}></div>
      )
    default:
      return (
        <div className={clsx(style.skeleton_text, style.skeleton)}></div>
      )
  }
}

export default Skeleton
