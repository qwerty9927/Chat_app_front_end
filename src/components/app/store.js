import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import menuSlice from "../features/menu/menuSlice"
import containerSlice from "../features/container/containerSlice"

export default configureStore({
  reducer: {
    auth: authSlice,
    menu: menuSlice,
    container: containerSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})
