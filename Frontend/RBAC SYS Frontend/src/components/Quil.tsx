import React,{FC} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // include styles


const toolbarOptions = {toolbar:[
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ]};
  

  interface props{
    label:string,
    id:string,
    value:string,
    onChange:()=>void,
    
  }

const QuillEditor : FC<props> = ({label, id ,value ,onChange})=>{
    return (
      
      <>
      <div className='p-4 flex justify-cente flex-col gap-2 rounded-md '>
      {label? <label className='p-2  text-lg' htmlFor={id}>{label}</label>:""}
      <ReactQuill id={id}  className='outline-none rounded-lg border-2 border-green-700  overflow-y-auto
      bg-slate-100' theme="snow" value={value} defaultValue={value}  modules={toolbarOptions} onChange={onChange} />
      </div>
      </>
    );
}

export default QuillEditor

  