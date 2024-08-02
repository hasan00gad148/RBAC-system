import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Home,About ,Register, Login, Articles, MyArticles, AdminDashboard } from "./pages/index";
import {useAppDispatch, login}  from './store/userStore';

interface ApiResponseFail {
  ok: false;
  message: string;
  error: string;
}

interface User {
  id: number;
  userName: string;
  password: string;
  email: string;
  phone: string;
  role_id: number;
  role: string;
  updatedAt: string;
  createdAt: string;
}

interface ApiResponseSuccess { 
  ok: true;
  user: User;
  token: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseFail;

function App() {

  const dispatcher = useAppDispatch();
  useEffect(() =>{
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("token")
        token = token?token:"";
        const response = await fetch('http://localhost:3505/auth',{
          headers: {
            "Authorization":token
          }
        });
        const result:ApiResponse = await response.json();
        if (result.ok) 
          dispatcher(login({...result.user, isLoggedIn: true,}))
        else
        console.error('Error fetching data!!!!!!!!');
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data');
      }

     
    };

    fetchData();
  },[dispatcher])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="articles/" element={<Articles />} >
          </Route>
          <Route path="myarticles" element={<MyArticles />} />
          <Route path="admin/" element={<AdminDashboard />} >

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
