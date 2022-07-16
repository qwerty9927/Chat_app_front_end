import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import { selectStateMenu } from '../../features/menu/menuSlice'
import ChatContainer from './ChatContainer'
import AddUserContainer from './AddUserContainer'
import RequestContainer from './RequestContainer'
import { selectStateContainer } from '../../features/container/containerSlice'

function ShowContainer(){
  const state = useSelector(selectStateMenu)
  const stateContainer = useSelector(selectStateContainer)
  let Component = () => {
    return (
      <Box 
        sx={{
          bgcolor: '#131317',
          height: '100vh',
        }}
      >
      </Box>
    )
  }

  //Chọn container
  if(state.status.chat && stateContainer.items.itemChat){
    Component = () => <ChatContainer />
  } else if(state.status.addUser && stateContainer.items.itemUser) {
    Component = () => <AddUserContainer />
  } else if(state.status.request && stateContainer.items.itemRequest){
    Component = () => <RequestContainer />
  }
  return (
    <Component />
  )
}

export default ShowContainer