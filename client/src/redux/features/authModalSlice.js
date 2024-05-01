import {createSlice} from '@reduxjs/toolkit'

const authModalSlice = createSlice({
    name: "AuthModal",
    initialState: {
       authModalOpen: false
    },
    reducers: {
        setAuthModalOpen: (state, action)=>{
            state.appState = action.payload
        }
    }
})

export const {setAppState} = authModalSlice.actions

export default appStateSlice.reducer