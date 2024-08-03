import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Home,About ,Register, Login, Articles, MyArticles, AdminDashboard, User,Article, ArticleForm  } from "./pages/index";
import {useAppDispatch, login}  from './store/userStore';
import  { ApiResponseSuccess, ApiResponseFail,  } from "./types/types"


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
// /users/:id/del
    fetchData();
  },[dispatcher])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="articles" element={<Articles />}/>
          <Route path="articles/add" element={<ArticleForm forEdit={false} />}/>
          <Route path="articles/:id" element={<Article />}/>
          <Route path="articles/:id/edit" element={<ArticleForm forEdit={true} />}/>
          <Route path="myarticles" element={<MyArticles />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="user/:id" element={<User />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
