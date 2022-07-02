import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { logout } from '../features/auth/authSlice';
import { HoverIconButton } from './globalStyle/style'
import { selectAdd, selectMessage, selectRequest, selectSetting, selectStateMenu } from '../features/menu/menuSlice';

function SideBar(){
  const state = useSelector(selectStateMenu)
  const domBtnMessage = useRef({})
  const domBtnAdd = useRef({})
  const domBtnRequest = useRef({})
  const dispatch = useDispatch()
  return (
    <Box sx={{
      bgcolor: '#121216',
      height: '100vh'
    }}>
      <Grid container 
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '100vh'
        }}
      >
        <Grid item xs={1}></Grid>
        <Grid item xs>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <HoverIconButton color='primary' ref={domBtnMessage}  onClick={() => {dispatch(selectMessage(domBtnMessage.current))}}>
              {state.status.chat ? <ChatIcon /> : <ChatIcon sx={{color: '#595966'}} />}
            </HoverIconButton>
            <HoverIconButton color='primary' ref={domBtnAdd} onClick={() => {dispatch(selectAdd(domBtnAdd.current))}}>
              {state.status.addUser ? <PersonAddIcon /> : <PersonAddIcon sx={{color: '#595966'}} />}
            </HoverIconButton>
            <HoverIconButton color='primary' ref={domBtnRequest} onClick={() => {dispatch(selectRequest(domBtnRequest.current))}}>
              {state.status.request ? <LocalPostOfficeIcon /> : <LocalPostOfficeIcon sx={{color: '#595966'}} />}
            </HoverIconButton>
            <HoverIconButton color='primary'>
              <SettingsIcon sx={{color: '#595966'}} />
            </HoverIconButton>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <HoverIconButton onClick={() => {dispatch(logout())}}>
            <LogoutIcon sx={{color: '#595966'}} />
          </HoverIconButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SideBar