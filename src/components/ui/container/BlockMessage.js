import style from './css/container.module.scss'
import Circle from '../utils/Circle'

function BlockMessage({ data, nameFriend, nameRoot, idRootUser }) {
  console.log(data)
  function convertTime(time) {
    const timeConvert = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    return timeConvert
  }
  return (
    <>
      {data.map((item ,index) => {
        if(item.idAuthor === idRootUser){
          return (
            <div className={style.message_author} key={index}>
              <div className={style.message}>
                <div className={style.message_title}>
                  <span className={style.time}>{convertTime(item.Time)}</span>
                  <span className={style.name}>You</span>
                </div>
                <div className={style.message_content}>
                  <p className={style.text}>{item.Message}</p>
                </div>
              </div>
              <Circle>{nameRoot.split('')[0]}</Circle>
            </div>
          )
        } else {
          return (
            <div className={style.message_other} key={index}>
              <Circle>{nameFriend.split('')[0]}</Circle>
              <div className={style.message} style={{margin: 0, marginLeft: '0.625rem'}}>
                <div className={style.message_title} style={{textAlign: 'left'}}>
                  <span className={style.name} style={{margin: 0, marginRight: '0.625rem'}} >{nameFriend}</span>
                  <span className={style.time}>{convertTime(item.Time)}</span>
                </div>
                <div className={style.message_content} style={{justifyContent: 'flex-start'}}>
                  <p className={style.text} style={{borderRadius: '1rem', borderTopLeftRadius: 0, backgroundColor: '#292b33'}}>{item.Message}</p>
                </div>
              </div>
            </div>
          )
        }
      })}
    </>
  )
}

export default BlockMessage
