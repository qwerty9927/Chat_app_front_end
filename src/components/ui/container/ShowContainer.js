import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { selectStateMenu } from '../../features/menu/menuSlice'
import style from './css/container.module.scss'
import ChatContainer from './ChatContainer'
import AddUserContainer from './AddUserContainer'
import RequestContainer from './RequestContainer'
import { selectStateContainer } from '../../features/container/containerSlice'

function ShowContainer(){
  const state = useSelector(selectStateMenu)
  const stateContainer = useSelector(selectStateContainer)
  const classNameGeneral = style.defaultContainer
  let Component = () => {
    return (
      <div className={classNameGeneral}></div>
    )
  }

  //Chọn container
  if(state.status.chat && stateContainer.items.itemChat){
    Component = () => <ChatContainer className={classNameGeneral} />
  } else if(state.status.addUser && stateContainer.items.itemUser) {
    Component = () => <AddUserContainer className={classNameGeneral} />
  } else if(state.status.request && stateContainer.items.itemRequest){
    Component = () => <RequestContainer className={classNameGeneral} />
  }
  return (
    <Component />
  )
}

export default ShowContainer