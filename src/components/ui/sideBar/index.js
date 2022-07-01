import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { logout } from '../../features/auth/authSlice';
import { HoverIconButton } from '../globalStyle/style'

function SideBar(){
  const dispatch = useDispatch()
  const initValue = {
    chat: true,
    settings: false,
    addUser: false,
    mail: false
  }
  const [ clickBtn, setClickBtn ] = useState(initValue)
  const activeClick = (btnState) => {
    return {...initValue, chat: false, ...btnState}
  }
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
            <HoverIconButton color='primary' onClick={() => {setClickBtn(activeClick({chat: true}))}}>
              {clickBtn.chat ? <ChatIcon /> : <ChatIcon sx={{color: '#595966'}} />}
            </HoverIconButton>
            <HoverIconButton color='primary' onClick={() => {setClickBtn(activeClick({addUser: true}))}}>
              {clickBtn.addUser ? <PersonAddIcon /> : <PersonAddIcon sx={{color: '#595966'}} />}
            </HoverIconButton>
            <HoverIconButton color='primary' onClick={() => {setClickBtn(activeClick({mail: true}))}}>
              {clickBtn.mail ? <LocalPostOfficeIcon /> : <LocalPostOfficeIcon sx={{color: '#595966'}} />}
            </HoverIconButton>
            <HoverIconButton color='primary' onClick={() => {setClickBtn(activeClick({settings: true}))}}>
              {clickBtn.settings ? <SettingsIcon /> : <SettingsIcon sx={{color: '#595966'}} />}
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