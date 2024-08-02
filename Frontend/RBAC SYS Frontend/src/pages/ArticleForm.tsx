import React,  {useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/input';
import Button from '../components/button';
import MyEditor from '../components/quill';
import databasesService from '../appwrite/database';
import { useNavigate,useLocation } from 'react-router-dom';





function BlogForm() {

  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch,control } = useForm();
  const navigate = useNavigate()
  const location  = useLocation()
  const blog = location.state?.blog

  // console.log(blog)

  async function onSubmitAdd(data) {
    console.log(data);
    const db =  new databasesService()
    const file = await db.addImage(data.thumbnail)
    console.log(file);
    const res = await db.addBlog({title: data.title,
      content:data.content,
      blog_img_id:file.$id,
      blog_img_url: db.urlImage(file.$id)
    });
    navigate(`/blog/${blog?.$id}`,{state:{blog:res}})
  }

  async function onSubmitEdit(data) {

    try {
      console.log("data", data);
    const db =  new databasesService()

    if (blog.blog_img_id)
      await db.deleteImage(blog.blog_img_id);
    const file = await db.addImage(data.thumbnail)
    console.log(file);
   
    const res = await db.editBlog(blog.$id, {title: data.title,
        content:data.content,
        blog_img_id:file.$id,
        blog_img_url: db.urlImage(file.$id)
      }); 

      navigate(`/blog/${blog?.$id}`,{state:{blog:res}})


    } catch (error) {
      console.log(error);
    }
    
  }
 
  const onSubmit = !blog? onSubmitAdd : onSubmitEdit 


  return (
    <div className='text-center w-7/8 md:w-5/6 lg:w-3/4 mx-auto mt-32 p-8 bg-gray-200 rounded-xl shadow-md'>
    <h1 className='font-bold text-2xl p-4 my-4'>Blog Form</h1>
    <form action="" onSubmit={handleSubmit(onSubmit)}>

      <Controller
        name="title"
        control={control}
        rules={{
          required: { value: true, message: "input is required" },
          minLength: { value: 4, message: "at least 4 chars" }
        }}
        defaultValue={blog?.title}
        render={({ field }) => (
          <Input {...field} label={"title:"} type={"text"} placeHolder={"title"}
          id={"title"}/>
        )}
        />{errors.title?<p className='bg-red-700'> {errors.title.message}</p>:null}


    <Controller
            name="thumbnail"
            control={control}
            rules={{
              required: { value: true, message: "input is required" },
            }}
            defaultValue={""}
            render={({ field: { ref, ...field } }) => (
              <Input {...field} label={"thumbnail:"} type={"file"}
              onChange={(e)=>{setValue('thumbnail', e.target.files[0]) }}
              ref={(e) => {
                // Connect the input ref
                ref(e);
                field.ref(e);
              }}
              value={null}
              id={"thumbnail"} />
      
            )}
            />{errors.thumbnail?<p className='bg-red-700'> {errors.thumbnail.message}</p>:null}

    <Controller
            name="content"
            control={control}
            rules={{
              required: { value: true, message: "input is required" },
            }}
            defaultValue={blog?.content}
            render={({ field }) => (
              <MyEditor {...field} value={blog?.content} label={"content:"} 
              id={"content"} />
            )}
            />{errors.content?<p className='bg-red-700'>{errors.content.message}</p>:null}


    <Button name={"submit"} onClick={()=>{}}/>
    </form>
    </div>
  )
}

export default BlogForm





