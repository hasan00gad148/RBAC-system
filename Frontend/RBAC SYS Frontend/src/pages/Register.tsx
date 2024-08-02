import React from 'react'
import { useForm, Controller, SubmitHandler  } from 'react-hook-form';
import { Input, Button } from '../components/index';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, login}  from '../store/userStore';
import  { ApiResponseSuccess, ApiResponseFail, IFormInputs } from "../types/types"



type ApiResponse = ApiResponseSuccess | ApiResponseFail;


const Register = () => {

  const navigate = useNavigate();
  const dispatcher = useAppDispatch();

  const {control, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> =async data => {


    try {
      const res = await fetch("http://localhost:3505/register",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      const resData:ApiResponse = await res.json();
      console.log("register: ",resData)
      if (resData.ok){
        dispatcher(login({...resData.user, isLoggedIn: true,})) //
        localStorage.setItem("token",resData.token)
        navigate("/home")
      }
      else
        alert(resData.message)
        
    }   
    catch(err) {
        console.log(err);
        
    }
  };

  return (
    <div className='mt-16 mx-auto bg-slate-50 p-8 w-3/4 rounded-lg shadow-lg'>
      <h1 className='font-bold text-xl'>Registeration Form</h1>
      <form action="post" className='p-8' onSubmit={handleSubmit(onSubmit)}>
        
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} name={'username'} type={'text'} value={''}
          label='username' placeHolder='enter username' errors={errors.username?.message}/>}
          /> 

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} name={'email'} type={'email'} value={''}
          label='email' placeHolder='enter email' errors={errors.email?.message}/>}
          /> 

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} name={'phone'} type={'text'} value={''}
          label='phone' placeHolder='enter phone'
          pattern="\+[0-9]{2,3}-[0-9]{4,11}"
          errors={errors.phone?.message}/>}
          /> 

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} name={'password'} type={'password'} value={''}
          label='password' placeHolder='enter password' errors={errors.password?.message}/>}
          /> 


        <Button name={'submit'} className={''} />
      </form>
    </div>
  )
}

export default Register


/* <Controller
name="content"
control={control}
defaultValue=""
render={({ field }) => <QuillEditor {...field} />}
/> */