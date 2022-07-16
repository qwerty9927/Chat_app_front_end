import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {
    itemChat: null,
    itemUser: null,
    itemRequest: null
  }
}

const containerSlice = createSlice({
  name: "container",
  initialState,
  reducers: {
    selectChatRoom(state, action){
      return {items: { ...initialState.items, itemChat: action.payload}}
    },
    selectItemUser(state, action){
      return {items: { ...initialState.items, itemUser: action.payload}}
    },
    selectItemRequest(state, action){
      return {items: { ...initialState.items, itemRequest: action.payload}}
    },
    clearAllItems(state){
      return initialState
    }
  }
})

export default containerSlice.reducer
export const { selectChatRoom, selectItemRequest, selectItemUser, clearAllItems } = containerSlice.actions
export function selectStateContainer(state){
  return state.container
}
