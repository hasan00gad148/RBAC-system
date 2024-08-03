import React, {useEffect, useState} from 'react'
import { useForm, Controller, SubmitHandler  } from 'react-hook-form';
import { Input, Button } from '../components/index';
import { useNavigate,useParams } from 'react-router-dom';
import  { ArticleI, ApiResponseFail, IFormArticleInputs } from "../types/types"




const ArticleForm:React.FC<{forEdit:boolean}> = ({forEdit}) => {

  const [article,setArticle] = useState<ArticleI>();
  const navigate = useNavigate();
  const { id } = useParams();

  const {control, handleSubmit, formState: { errors } } = useForm<IFormArticleInputs>();

  const edit: SubmitHandler<IFormArticleInputs> =async data => {
    console.log("SubmitHandler: ",data)
    try {
      let token = localStorage.getItem("token")
      token = token?token:"";

      const res = await fetch(`http://localhost:3505/articles/${article?.id}/edit`,{
        method: 'POST',
        body: JSON.stringify(data),

        headers: {
          'Content-Type': 'application/json',
          "Authorization":token
        }
       });

      const resData:{ok:true, message: string} | ApiResponseFail = await res.json();

      if (resData.ok){
        navigate("/articles/" + id);
      }
      else{
        console.log(resData.message,resData.error);
        alert(resData.message)
   
      }

      
    } catch (error) {
      alert(`An error occurred ${error}`);
    }
   
  };

  const add: SubmitHandler<IFormArticleInputs> =async data => {
    try {
      let token = localStorage.getItem("token")
      token = token?token:"";

      const res = await fetch("http://localhost:3505/articles/add",{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          "Authorization":token
        }
       });

      const resData:{ok:true, article: ArticleI} | ApiResponseFail = await res.json();

      if (resData.ok)
        navigate("/articles/" +resData.article.id);
      else
        console.log(resData.message,resData.error)

      
    } catch (error) {
      alert(`An error occurred ${error}`);
    }
   
  };
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
        if (id )
          fetchData();
      } catch (error) {
        console.log(error);
      }
    }, [id]);




  return (
    <div className='mt-16 mx-auto bg-slate-50 p-8 w-3/4 rounded-lg shadow-lg'>
      <h1 className='font-bold text-xl'>Article Form</h1>
      <form action="post" className='p-8' onSubmit={forEdit?handleSubmit(edit):handleSubmit(add)}>
        

        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} name={'title'} type={'text'} value={article?.title||""}
          label='title' placeHolder='enter title' errors={errors.title?.message}/>}
          /> 

        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} name={'content'} type={'text'} value={article?.content||""}
          label='content' placeHolder='enter content' errors={errors.content?.message}/>}
          /> 


        <Button name={'submit'} className={''} />
      </form>
    </div>
  )
}

export default ArticleForm





