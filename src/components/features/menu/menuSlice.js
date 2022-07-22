import { createSlice } from '@reduxjs/toolkit'
import { menuMessage, menuAdd, menuRequest, menuSetting } from '../../../config/instance'

const initialState = {
  type: menuMessage,
  status: {
    chat: true,
    addUser: false,
    request: false
  },
  choiceItem: { status: false }
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    selectMessage(state, action) {
      return { ...state, type: menuMessage, status: { ...initialState.status, chat: true } }
    },
    selectAdd(state, action) {
      return { ...state, type: menuAdd, status: { ...initialState.status, chat: false, addUser: true } }
    },
    selectRequest(state, action) {
      return { ...state, type: menuRequest, status: { ...initialState.status, chat: false, request: true } }
    },
    cleanChoiceItem(state, action) {
      return { ...state, choiceItem: { status: true } }
    },
    clearAllMenu(state) {
      console.log(initialState)
      return initialState
    }
  }
})

export default menuSlice.reducer
export const { selectMessage, selectAdd, selectRequest, clearAllMenu, cleanChoiceItem } = menuSlice.actions
export function selectStateMenu(state) {
  return state.menu
}