import style from './css/circle.module.scss'

function Circle({ children }){
  return (
    <div className={style.circle}>
      { children }
    </div>
  )
}

export default Circle