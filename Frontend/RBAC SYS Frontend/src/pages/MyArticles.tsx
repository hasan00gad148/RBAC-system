import React, { useEffect, useState } from 'react'
import  { ArticleI,ApiResponseFail } from "../types/types"
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';









const MyArticles = () => {

  const [articles,setArticles] = useState<ArticleI[]>();
  const navigate = useNavigate();
 

  useEffect(()=>{

    let token = localStorage.getItem("token")
    token = token?token:"";

    const fetchData = async()=>{

       const res = await fetch("http://localhost:3505/articles/user",{
        method: 'GET',
        headers: {
          "Authorization":token
        }
       });
       const data:{ok:true, articles:ArticleI[]}|ApiResponseFail = await res.json();
       console.log(data);
       
       if(data.ok)
          setArticles(data.articles)
        else
            console.log(data.message,data.error)
    }

      try {
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }, []);



  return (
    <div className='mt-16 mx-auto bg-slate-50 p-8 w-3/4 rounded-lg shadow-lg '>

    <div className='flex justify-center items-center p-4 gap-6'>
      <span className='text-lg'> Post an article</span>
      <Button name={'Add'} className={'bg-blue-400 text-white'} onClick={()=>{navigate("/articles/add")}}/>
    </div>

    {articles && 
      <div className='text-center overflow-hidden'>
          {
            !articles.length?
            <h1>no articles found</h1>:
            <div>
                <h1 className='my-4 text-xl'>articles list</h1>
                <ul className='h-64 grid grid-cols-1 justify-center items-center rounded-lg gap-4 overflow-y-scroll'>
                    {articles.map(article =>(
                    <div key={article.id} className='flex h-fit items-center justify-around bg-green-100  rounded-xl'>
                        <div className='flex gap-6'>
                          <span>{article.title}</span>
                          <span>{new Date(article.createdAt).toLocaleString()}</span>
                        </div>
                        <Button name={'view'} className={''} onClick={()=>{navigate("/articles/"+article.id)}}/>
                    </div>
                  ))}
                </ul>
                {/*  <Button name={'view'} className={''} onClick={()=>{navigate("/articles/"+article.id)}}/> */}
            </div>
          }
      </div>
    }
  </div>
  )
}
export default MyArticles