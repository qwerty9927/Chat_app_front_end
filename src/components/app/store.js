import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import menuSlice from "../features/menu/menuSlice"

export default configureStore({
  reducer: {
    auth: authSlice,
    menu: menuSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})
