import React, { useEffect, useState } from 'react'
import  { UserI,ApiResponseFail } from "../types/types"
// import Button from '../components/Button';
import { useNavigate,useParams } from 'react-router-dom';






const User = () => {
    const { id } = useParams();
    const [user,setUser] = useState<UserI>();
    const navigate = useNavigate();
    const [roles, setRoles] = useState<{roleName:string,id:number}[]|undefined>();
    const [selectedRole, setSelectedRole] = useState(-1);

    const handleRoleChange = async () => {
        const token = localStorage.getItem("token") || "";
    
        const res = await fetch(`http://localhost:3505/users/${id}/editrole`, {
          method: 'POST',
          headers: {
            "Authorization": token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ role_id: selectedRole })
        });
    
        const data = await res.json();
    
        if (data.ok && user && roles) {
          alert(`Role updated successfully: ${data.message}`);
          setUser({ ...user, Role: { roleName: roles[selectedRole-1].roleName } });
        } else {
          alert(`Error updating role: ${data.message}`);
        }
      };
    useEffect(()=>{

        let token = localStorage.getItem("token")
        token = token?token:"";

        const fetchData = async()=>{

           const res = await fetch("http://localhost:3505/users/"+id,{
            method: 'GET',
            headers: {
              "Authorization":token
            }
           });
           const data:{ok:true, user:UserI}|ApiResponseFail = await res.json();

           if(data.ok)
                setUser(data.user)
            else
                console.log(data.message,data.error)
        }
        const fetchRoles = async () => {
            const res = await fetch(`http://localhost:3505/roles`, {
                method: 'GET',
                headers: {
                "Authorization": token
                }
            });
            const data = await res.json();

            if (data.ok) {
                setRoles(data.roles);
            } else {
                alert(data.message)
                console.log(data.message, data.error);
            }
            };

            try {
            fetchData();
            fetchRoles();
            } catch (error) {
            console.log(error);
            }
        }, [id]);


    return (
        <div className='p-6 bg-gray-100 rounded-lg shadow-md w-2/3 mx-auto'>
          <h1 className='text-2xl font-bold mb-4 mx-auto'>User</h1>
          {user && (
            <>
              <div className='flex flex-col items-start w-2/3 mx-auto'>
                <h2 className='text-lg font-semibold p-4'>Username: <span className='font-normal'>{user.userName}</span></h2>
                <h2 className='text-lg font-semibold p-4'>Email: <span className='font-normal'>{user.email}</span></h2>
                <h2 className='text-lg font-semibold p-4'>Role: <span className='font-normal'>{user.Role.roleName}</span></h2>
                <h2 className='text-lg font-semibold p-4'>Phone: <span className='font-normal'>{user.phone}</span></h2>
                <h2 className='text-lg font-semibold p-4'>Created At: <span className='font-normal'>{user.createdAt}</span></h2>
                <h2 className='text-lg font-semibold p-4'>Updated At: <span className='font-normal'>{user.updatedAt}</span></h2>
              </div>
              <div className='flex flex-col items-center w-2/3 mx-auto'>
                <label className='text-lg font-semibold p-4'>Change Role:</label>
                <select
                  className='p-2 border rounded'
                  value={selectedRole}
                  onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSelectedRole(Number(e.target.value))}
                >
                  <option value="">Select a role</option>
                  {roles&& roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.roleName}</option>
                  ))}
                </select>
                <button
                  className='mt-4 p-2 bg-blue-500 text-white rounded'
                  onClick={handleRoleChange}
                >
                  Update Role
                </button>
              </div>
              <div className='flex justify-center gap-8 mt-8'>
                
                <button
                  className='p-2 bg-red-500 text-white rounded'
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token") || "";
    
                      const res = await fetch(`http://localhost:3505/users/${id}/del`, {
                        method: 'POST',
                        headers: {
                          "Authorization": token
                        }
                      });
    
                      const data = await res.json();
    
                      if (data.ok) {
                        alert(`Success: ${data.message}`);
                        navigate("/admin");
                      } else {
                        alert(`Error: ${data.message}`);
                      }
                    } catch (error) {
                      alert(`Error: ${error}`);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      );
}

export default User