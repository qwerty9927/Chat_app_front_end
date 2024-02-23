import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { menuMessage, menuAdd, menuRequest, menuSetting } from '../../../config/instance'
import { clearDom, selectStateMenu } from '../../features/menu/menuSlice'
import style from './css/menu.module.scss'
import MenuMessage from './MenuMessage'
import MenuAdd from './MenuAdd'
import MenuRequest from './MenuRequest'

function ShowMenu() {
  const state = useSelector(selectStateMenu)
  const dispatch = useDispatch()
  const classNameGeneral = style.defaultMenu
  let Component = null
 
  switch (state.type) {
    case menuMessage:
      Component = MenuMessage
      break
    case menuAdd:
      Component = MenuAdd
      break
    case menuRequest:
      Component = MenuRequest
      break
  }
  
  return (
    <>
      {Component ? <Component className={classNameGeneral}/> : null}
    </>
  )
}

export default ShowMenu
