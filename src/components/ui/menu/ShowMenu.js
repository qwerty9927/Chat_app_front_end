import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { menuMessage, menuAdd, menuRequest, menuSetting } from '../../../config/instance'
import { clearDom, selectStateMenu } from '../../features/menu/menuSlice'
import MenuMessage from './MenuMessage'
import MenuAdd from './MenuAdd'
import MenuRequest from './MenuRequest'
import { Menu } from '@mui/material'

function ShowMenu({ className }) {
  const state = useSelector(selectStateMenu)
  const dispatch = useDispatch()
  let Component
 
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
    <Component className={className} />
  )
}

export default ShowMenu
