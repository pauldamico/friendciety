import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {allUsers:[]
}

export const allUsersSlice = createSlice({
    name:"allUsers",
    initialState,
    reducers:{
        setAllUsers:(state, action:PayloadAction<typeof initialState['allUsers']>)=>{
            state.allUsers = action.payload
        }
    }



})


