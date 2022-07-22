import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx';
import style from './css/sideBar.module.scss'
import Button from '../utils/Button';

import { logout } from '../../features/auth/authSlice';
import { clearAllMenu, cleanChoiceItem, selectAdd, selectMessage, selectRequest, selectStateMenu } from '../../features/menu/menuSlice';
import {clearAllItems} from '../../features/container/containerSlice'

function SideBar() {
  const state = useSelector(selectStateMenu)
  const dispatch = useDispatch()

  function handleLogOut(){
    console.log("logout")
    dispatch(logout())
    dispatch(clearAllItems())
    dispatch(clearAllMenu())
  }
  return (
    <div className={clsx(style.defaultSideBar, style.sideBar)}>
      <div className={style.topSideBar}></div>
      <div className={style.centerSideBar}>
        <Button 
          active={state.status.chat} 
          onClick={() => {
            dispatch(clearAllItems())
            dispatch(cleanChoiceItem())
            dispatch(selectMessage())
          }}
        >
          <i className="fas fa-comment"></i>  
        </Button>
        <Button 
          active={state.status.addUser}
          onClick={() => {
            dispatch(clearAllItems())
            dispatch(cleanChoiceItem())
            dispatch(selectAdd())
          }}
        >
        <i className="fa-solid fa-user-plus"></i> 
        </Button>
        <Button 
          active={state.status.request}
          onClick={() => {
            dispatch(clearAllItems())
            dispatch(cleanChoiceItem())
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
  )
}

export default SideBar