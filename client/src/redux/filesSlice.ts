import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {files:{
    _id:"",
    username:"",
    userId:"",
    images:[],
    videos:[],   }
}

export const filesSlice = createSlice({
    name:"files",
    initialState,
    reducers:{
        setFiles:(state, action:PayloadAction<typeof initialState['files']>)=>{
            state.files = action.payload
        }
    }



})


