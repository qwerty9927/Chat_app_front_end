import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {
    itemChat: null,
    itemUser: null,
    itemRequest: null
  },
  showContainer: false
}

const containerSlice = createSlice({
  name: "container",
  initialState,
  reducers: {
    selectChatRoom(state, action) {
      return { items: { ...initialState.items, itemChat: action.payload }, showContainer: true }
    },
    selectItemUser(state, action) {
      return { items: { ...initialState.items, itemUser: action.payload }, showContainer: true }
    },
    selectItemRequest(state, action) {
      return { items: { ...initialState.items, itemRequest: action.payload }, showContainer: true }
    },
    clearAllItems(state) {
      return initialState
    }
  }
})

export default containerSlice.reducer
export const { selectChatRoom, selectItemRequest, selectItemUser, clearAllItems } = containerSlice.actions
export function selectStateContainer(state) {
  return state.container
}
