import { createSlice } from '@reduxjs/toolkit'
import { menuMessage, menuAdd, menuRequest, menuSetting } from '../../../config/instance'

const initialState = {
  type: menuMessage,
  status: {
    chat: true,
    addUser: false,
    request: false
  }
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    selectMessage(state, action) {
      return {  ...initialState, type: menuMessage, status: {...initialState.status, chat: true }}
    },
    selectAdd(state, action) {
      return {  ...initialState, type: menuAdd, status: {...initialState.status, chat: false, addUser: true }}
    },
    selectRequest(state, action) {
      return {  ...initialState, type: menuRequest, status: {...initialState.status, chat: false, request: true }}
    },
    clearAllMenu(state){
      return initialState
    }
  }
})

export default menuSlice.reducer
export const { selectMessage, selectAdd, selectRequest, clearDom, clearAllMenu } = menuSlice.actions
export function selectStateMenu(state){
  return state.menu
}