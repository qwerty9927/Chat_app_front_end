import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx';
import style from './css/sideBar.module.scss'
import Button from '../utils/Button';

import { logout } from '../../features/auth/authSlice';
import { clearAllMenu, selectAdd, selectMessage, selectRequest, selectStateMenu } from '../../features/menu/menuSlice';
import {clearAllItems} from '../../features/container/containerSlice'

function SideBar({ className }) {
  const state = useSelector(selectStateMenu)
  const dispatch = useDispatch()

  function handleLogOut(){
    console.log("logout")
    dispatch(logout())
    dispatch(clearAllItems())
    dispatch(clearAllMenu())
  }
  return (
    <div className={clsx(className, style.sideBar)}>
      <div className={style.topSideBar}></div>
      <div className={style.centerSideBar}>
        <Button 
          active={state.status.chat} 
          onClick={() => {
            dispatch(clearAllItems())
            dispatch(selectMessage())
          }}
        >
          <i className="fas fa-comment"></i>  
        </Button>
        <Button 
          active={state.status.addUser}
          onClick={() => {
            dispatch(clearAllItems())
            dispatch(selectAdd())
          }}
        >
        <i className="fa-solid fa-user-plus"></i> 
        </Button>
        <Button 
          active={state.status.request}
          onClick={() => {
            dispatch(clearAllItems())
            dispatch(selectRequest())
          }}
        >
          <i className="fa-solid fa-envelope"></i>  
        </Button>
        <Button>
          <i className="fa-solid fa-gear"></i>
        </Button>
      </div>
      <div className={style.bottomSideBar}>
        <Button onClick={handleLogOut}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </Button>
      </div>
    </div>
    // <Box sx={{
    //   bgcolor: '#121216',
    //   height: '100vh'
    // }}>
    //   <Grid container
    //     direction="column"
    //     justifyContent="center"
    //     alignItems="center"
    //     sx={{
    //       height: '100vh'
    //     }}
    //   >
    //     <Grid item xs={1}></Grid>
    //     <Grid item xs>
    //       <Box sx={{
    //         display: 'flex',
    //         flexDirection: 'column',
    //         justifyContent: 'center'
    //       }}>
    //         <HoverIconButton
    //           color='primary'
    //           ref={domBtnMessage}
    //           onClick={() => {
    //             dispatch(clearAllItems())
    //             dispatch(selectMessage(domBtnMessage.current))
    //           }}
    //         >
    //           {state.status.chat ? <ChatIcon /> : <ChatIcon sx={{ color: '#595966' }} />}
    //         </HoverIconButton>
    //         <HoverIconButton 
    //           color='primary' 
    //           ref={domBtnAdd} 
    //           onClick={() => { 
    //             dispatch(clearAllItems())
    //             dispatch(selectAdd(domBtnAdd.current)) 
    //           }}
    //         >
    //           {state.status.addUser ? <PersonAddIcon /> : <PersonAddIcon sx={{ color: '#595966' }} />}
    //         </HoverIconButton>
    //         <HoverIconButton 
    //           color='primary' 
    //           ref={domBtnRequest} 
    //           onClick={() => { 
    //             dispatch(clearAllItems())
    //             dispatch(selectRequest(domBtnRequest.current))
    //           }}
    //         >
    //           {state.status.request ? <LocalPostOfficeIcon /> : <LocalPostOfficeIcon sx={{ color: '#595966' }} />}
    //         </HoverIconButton>
    //         <HoverIconButton color='primary'>
    //           <SettingsIcon sx={{ color: '#595966' }} />
    //         </HoverIconButton>
    //       </Box>
    //     </Grid>
    //     <Grid item xs={1}>
    //       <HoverIconButton onClick={handleLogOut}>
    //         <LogoutIcon sx={{ color: '#595966' }} />
    //       </HoverIconButton>
    //     </Grid>
    //   </Grid>
    // </Box>
  )
}

export default SideBar