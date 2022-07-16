import { createSlice } from '@reduxjs/toolkit'
import { menuMessage, menuAdd, menuRequest, menuSetting } from '../../../config/instance'

const initialState = {
  indexForMenuResponsive: 0,
  type: menuMessage,
  dom: null,
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
      return {  ...initialState, indexForMenuResponsive: 0, type: menuMessage, status: {...initialState.status, chat: true }, dom: action.payload}
    },
    selectAdd(state, action) {
      return {  ...initialState, indexForMenuResponsive: 1, type: menuAdd, status: {...initialState.status, chat: false, addUser: true }, dom: action.payload}
    },
    selectRequest(state, action) {
      return {  ...initialState, indexForMenuResponsive: 2, type: menuRequest, status: {...initialState.status, chat: false, request: true }, dom: action.payload}
    },
    clearDom(state){
      return { ...state, dom: null}
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