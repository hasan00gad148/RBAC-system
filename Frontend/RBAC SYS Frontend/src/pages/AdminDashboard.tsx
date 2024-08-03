import React,{ChangeEvent, MouseEvent, useState} from 'react'
import { Input, Button } from '../components/index';
import  { UserI,ApiResponseFail } from "../types/types"
import { useNavigate } from 'react-router-dom';



type ApiResponse = {ok:true, users:UserI[]} | ApiResponseFail;

async function searchUsers(identifier: string|undefined):Promise<UserI[] | null>{
  try {
    let token = localStorage.getItem("token")
    token = token?token:"";
    const response = await fetch('http://localhost:3505/users/search?identifier='+identifier,{
      method: 'GET',
      headers: {
        "Authorization":token
      }
    });
    const result:ApiResponse = await response.json();
    if (result.ok) 
      return result.users
    else
      console.log(result.message, result.error);
      
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Error fetching data');
  }
  return null;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserI[]|undefined>()
  const [identefier, setIdentefier] = useState<string>("")
  const navigate = useNavigate();



  return (
    <div className='mt-16 mx-auto bg-slate-50 p-8 w-3/4 rounded-lg shadow-lg '>
      <form action="" className=' flex justify-center'>
          <Input name={''} type={''} value={identefier} placeHolder='name or email or id' 
          onChange={(event: ChangeEvent<HTMLInputElement>)=>{
            setIdentefier(event.target.value);
          }}/>
          <Button name={'search'} className={''} onClick={async(event: MouseEvent<HTMLButtonElement>)=>{
            event.preventDefault();
            const users = await searchUsers(identefier)
            console.log(users);
            
            if (users)
                setUsers(users)
          }}/>
      </form>

      {users && 
        <div className='text-center overflow-hidden'>
            {
              !users.length?
              <h1>no users found</h1>:
              <div>
                  <h1 className='my-4 text-xl'>users list</h1>
                  <ul className='h-64 grid grid-cols-1 justify-center items-center rounded-lg gap-4 overflow-y-scroll'>
                      {users.map(user =>(
                      <div key={user.id} className='flex h-fit items-center justify-around bg-green-100  rounded-xl'>
                          <div className='flex gap-3'>
                            <span>{user.userName}</span>
                            <span>{user.email}</span>
                            <span>{user.Role.roleName}</span>
                          </div>
                          <Button name={'view'} className={''} onClick={()=>{navigate("/user/"+user.id)}}/>
                      </div>))}
                  </ul>
              </div>
            }
        </div>
      }
    </div>
  )
}

export default AdminDashboard