import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import  { UserState } from "../types/types"





  const initialState: UserState= {
    id: 0,
    userName: '',
    email: '',
    phone: '',

    role_id: 0,
    Role: {roleName: ''},

    isLoggedIn: false,
  };
  
  const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

      login(state, action: PayloadAction<UserState>){
        console.log(action.payload);
        
        return {...action.payload};
      },
      logout(state,){
        state.id=0;
        state.userName="",
        state.email="",
        state.phone="",
        state.role_id=0,
        state.Role={roleName:""}
        state.isLoggedIn = false
      }
    },
  });
  


const userStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});


export const { login, logout, } = userSlice.actions;
  


export default userStore;



type RootState = ReturnType<typeof userStore.getState>;
type AppDispatch = typeof userStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;