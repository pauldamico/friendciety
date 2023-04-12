import {createSlice, PayloadAction} from '@reduxjs/toolkit'


interface LoadingState {
    loading: boolean;
  }
  
  const initialLoadingState: LoadingState = {
    loading:false
  };
  
  /// comments
  export const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialLoadingState,
    reducers: {
      setLoading: (state, action: PayloadAction<LoadingState['loading']>) => {
        state.loading = action.payload;
      }, 
      resetLoading:(state)=>{
        state.loading = initialLoadingState.loading
      }
    },
  });