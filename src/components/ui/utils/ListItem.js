import clsx from "clsx"
import style from "./css/listItem.module.scss"
import Circle from "./Circle"

function ListItem({ avatar, name, hover, message, sx, primary, selected, onClick}) {
  // console.log(avatar)
  return (
    <div className={clsx(style.item, {[style.itemActive]: selected, [style.itemHover]: hover})} style={{sx}} onClick={onClick}>
      <div className={style.avatar}>
        <Circle>
          {avatar}
        </Circle>
      </div>
      <div className={style.content}>
        <p className={style.name}>{name}</p>
        {message ? <p className={style.message}>{message}</p>: null}
        
      </div>
      <div className={style.action}>
        {null || primary}
      </div>
    </div>
  )
}

export default ListItem