import {createSlice} from '@reduxjs/toolkit'

const appStateSlice = createSlice({
    name: "app-state",
    initialState: {
        appState: ""
    },
    reducers: {
        setAppState: (state, action)=>{
            state.appState = action.payload
        }
    }
})

export const {setAppState} = appStateSlice.actions

export default appStateSlice.reducer