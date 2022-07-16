import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import Box from "@mui/material/Box"
import ListItem from "@mui/material/ListItem"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import ListItemText from "@mui/material/ListItemText"
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import axiosToken from '../../../api/axiosToken'
import {selectState} from '../../features/auth/authSlice'
import { clearAllItems, selectItemRequest, selectStateContainer } from "../../features/container/containerSlice"


function RequestContainer() {
  const state = useSelector(selectState)
  const containerState = useSelector(selectStateContainer)
  const infoItem = containerState.items.itemRequest
  const dispatch = useDispatch()
  console.log(infoItem)

  async function handleSendRefuse(){
    try{
      await axiosToken.delete(`user/refuseRequest?idRefuse=${infoItem.idUser}`
      ,{
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        } 
      })
      dispatch(selectItemRequest({...infoItem, submitted: true}))
      alert("Refused invitation")
    }catch(e){
      alert("Sent failed")
    }
  }

  async function handleSendAccept(){
    const friend = {
      Username: infoItem.idUser,
      Name: infoItem.NameUserReq,
      Image: infoItem.Image
    }
    try{
      await axiosToken.post(`user/addFriend`
      ,{
        friend,
        mySelf: state.currentUser
      },{
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        } 
      })
      dispatch(selectItemRequest({...infoItem, submitted: true}))
      alert("Accepted invitation")
    }catch(e){
      alert("Sent failed")
    }
  }

  return (
    <Box 
      sx={{
        bgcolor: '#131317',
        height: '100vh',
        p: 2
      }}
    >
      <ListItem>
        <Avatar 
          sx={{ width: 56, height: 56 }}
        >
          {infoItem.NameUserReq.split('')[0]}
        </Avatar>
        <ListItemText 
          sx={{
            color: '#fff',
            pl: 2, 
            '& > span': {
              fontSize: 30
            }
          }}
        >
          {infoItem.NameUserReq}
        </ListItemText>
      </ListItem>
      <Box
        sx={{
          '& button': {
            mt: 1
          }
        }}
      >
        <Button variant="contained" color="error" fullWidth startIcon={<DeleteIcon />} onClick={handleSendRefuse}>
          Refuse
        </Button>
        <Button variant="contained" color="primary" fullWidth startIcon={<CheckIcon />} onClick={handleSendAccept}>
          Accept
        </Button>
      </Box>
    </Box>
  )
}

export default RequestContainer
