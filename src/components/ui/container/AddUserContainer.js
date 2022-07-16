import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import Box from "@mui/material/Box"
import ListItem from "@mui/material/ListItem"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import ListItemText from "@mui/material/ListItemText"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import axiosToken from '../../../api/axiosToken'
import { selectState } from "../../features/auth/authSlice"
import { selectItemUser, selectStateContainer } from '../../features/container/containerSlice'

function AddUserContainer() {
  const state = useSelector(selectState)
  const containerState = useSelector(selectStateContainer)
  const infoItem = containerState.items.itemUser
  const dispatch = useDispatch()

  console.log(infoItem)
  async function handleSentRequest() {
    try {
      await axiosToken.post('user/addRequest', {
        friend: { Username: infoItem.Username },
        mySelf: state.currentUser
      }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      })
      dispatch(selectItemUser({ ...infoItem, submitted: true }))
    } catch (e) {
      alert("Sent failed Add")
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
          {infoItem.Name.split('')[0]}
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
          {infoItem.Name}
        </ListItemText>
      </ListItem>
      <Box
        sx={{
          '& button': {
            mt: 1
          }
        }}
      >
        {infoItem.submitted || infoItem.idUserLog ?
          (<Button variant="outlined" fullWidth startIcon={<HourglassBottomIcon />}>
            Wait Accept
          </Button>)
          :
          (<Button variant="contained" fullWidth startIcon={<PersonAddIcon />} onClick={handleSentRequest}>
            Add friend
          </Button>)
        }
      </Box>
    </Box>
  )
}

export default AddUserContainer
