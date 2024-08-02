import React from 'react'
import { useLocation } from 'react-router-dom'
import parse from 'html-react-parser';
import Button from '../components/button';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"
import databasesService from '../appwrite/database';

function Blog() {
  const location  = useLocation()
  const navigate = useNavigate()

  const user = useSelector((state)=>state.userState.user)
  const blog = location.state.blog
  return (
    <>
    <div className=' text-center w-7/8 md:w-5/6 lg:w-3/4 mx-auto mt-32 p-8 bg-gray-200 rounded-xl shadow-md'>

      <h1 className='text-2xl font-bold'>{blog?.title}</h1>
      <img src={(blog?.blog_img_url)?.replace(/\s+/g, '')} className='mx-auto h-64 w-64 bg-cover my-2 rounded-xl object-cover' alt="" />
        <div className='bg-slate-50 rounded-lg p-4 mt-8 ql-editor'>
            { parse(blog?.content)}
        </div>

      {user?.$id===blog.user_id?    <div className='flex justify-center items-center gap-4'>
      <Button name={"edit"} onClick={()=>{
         navigate("/newblog", {state:{blog:blog}})
      }}/>
      <Button name={"delete"} onClick={async()=>{

        try {
          const db =  new databasesService()
          await db.deleteImage(blog.blog_img_id);
          await db.delete(blog.$id)
          navigate("/blogs")
        } catch (error) {
          console.error(error)
          alert("Error deleting blog")
        }
      }}/>
    </div>:null}
    </div>
   </>
  )
}

export default Blog