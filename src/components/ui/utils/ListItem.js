import clsx from "clsx"
import style from "./css/listItem.module.scss"

function ListItem({ avatar, name, message, primary, selected, onClick}) {
  console.log(avatar)
  return (
    <div className={clsx(style.item, {[style.itemActive]: selected})} onClick={onClick}>
      <div className={style.avatar}>
        <div className={style.circle}>
          {avatar}
        </div>
      </div>
      <div className={style.content}>
        <p className={style.name}>{name}</p>
        <p className={style.message}>{null || message}</p>
      </div>
      <div className={style.action}>
        {null || primary}
      </div>
    </div>
  )
}

export default ListItem