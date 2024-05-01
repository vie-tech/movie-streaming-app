import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js";
import themeModeReducer from "./features/themeModeSlice.js";
import appStateReducer from "./features/appStateSlice.js"

const store = configureStore({
    reducer: {
        user: userReducer,
        themeMode: themeModeReducer,
       
    }
})

export default store