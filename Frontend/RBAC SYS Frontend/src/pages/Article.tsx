import React, { MouseEvent, useEffect, useState } from 'react'
import  { ArticleI,ApiResponseFail } from "../types/types"
import {Button} from '../components/index';
import { useNavigate,useParams } from 'react-router-dom';
import { useAppSelector } from '../store/userStore';



const Article = () => {

  const [article,setArticle] = useState<ArticleI>();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useAppSelector((state) => state.user);

  useEffect(()=>{

    let token = localStorage.getItem("token")
    token = token?token:"";

    const fetchData = async()=>{

       const res = await fetch("http://localhost:3505/articles/"+id,{
        method: 'GET',
        headers: {
          "Authorization":token
        }
       });
       const data:{ok:true, article:ArticleI}|ApiResponseFail = await res.json();
       console.log(data);
       
       if(data.ok)
          setArticle(data.article)
        else
            console.log(data.message,data.error)
    }

      try {
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }, [id]);




  return (
    
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {article && <>
      <h1 className="text-3xl font-extrabold mb-4 text-gray-900">{article.title}</h1>
      <p className="text-lg text-gray-800 mb-6 leading-relaxed">{article.content}</p>
      <div className="text-sm text-gray-600 mb-4">
        <p>Created at: <span className="font-medium">{new Date(article.createdAt).toLocaleDateString()}</span></p>
        <p>Updated at: <span className="font-medium">{new Date(article.updatedAt).toLocaleDateString()}</span></p>
      </div>
      <div className="text-sm text-gray-600">
        <p>Author: <span className="font-medium">{article.User?.userName}</span></p>
        <p>Email: <span className="font-medium">{article.User?.email}</span></p>
      </div>
      {user.email === article.User?.email  && 
      <div className='flex justify-center gap-6'>
        
        <Button name={'edit'} className=' bg-yellow-500 text-white ' onClick={async(event: MouseEvent<HTMLButtonElement>) =>{
            event.preventDefault();
            navigate(`/articles/${article.id}/edit`)
        }}/>
        <Button name={'delete'} className=' bg-red-600  text-white ' onClick={async(event: MouseEvent<HTMLButtonElement>) =>{
            event.preventDefault();
            try {
              const token = localStorage.getItem("token") || "";

              const res = await fetch(`http://localhost:3505/articles/${id}/del`, {
                method: 'POST',
                headers: {
                  "Authorization": token
                }
              });

              const data = await res.json();

              if (data.ok) {
                alert(`Success: ${data.message}`);
                navigate("/articles");
              } else {
                alert(`Error: ${data.message}`);
              }
            } catch (error) {
              alert(`Error: ${error}`);
            }
        }}/>
        
      </div>}
      </>}
  </div>
  
  )
}

export default Article