import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';







interface UserState{
    id: string,
    username: string,
    email: string,
    phone: string,

    token: string|null|undefined,
    isLoggedIn: boolean
  }

  const initialState: UserState= {
    id: '',
    username: '',
    email: '',
    phone: '',
    token: null,
    isLoggedIn: false,
  };
  
  const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

      login(state, action: PayloadAction<UserState>){
        state= {...action.payload};
      },
      logout(state,){
        state.id="";
        state.username="",
        state.email="",
        state.phone="",
        state.token="",
        state.isLoggedIn = false
      }
    },
  });
  


const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});


export const { login, logout, } = userSlice.actions;
  


export default store;



type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;