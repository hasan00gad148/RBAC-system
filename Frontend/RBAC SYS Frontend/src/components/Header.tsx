import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/userStore';
import { useNavigate, } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <header className="bg-green-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl">{title}</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><NavLink to="/home" className={({isActive})=>{return isActive ? "text-gray-400" : "hover:text-gray-400";}}>
            Home</NavLink></li>
            <li><NavLink to="/about" className={({isActive})=>{return isActive ? "text-gray-400" : "hover:text-gray-400";}}>
            About</NavLink></li>
           { !user.isLoggedIn? 
           <><li><NavLink to="/register" className={({isActive})=>{return isActive ? "text-gray-400" : "hover:text-gray-400";}}>
            register</NavLink></li>
            <li><NavLink to="/login" className={({isActive})=>{return isActive ? "text-gray-400" : "hover:text-gray-400";}}>
            login</NavLink></li></>
            :
            <>
              <li><NavLink to="/articles" className="hover:text-gray-400">articles</NavLink></li>


              {user.Role.roleName ==="admin" && <li><NavLink to="/admin" 
              className={({isActive})=>{return isActive ? "text-gray-400" : "hover:text-gray-400";}}>Dashboard</NavLink></li> }
               {user.Role.roleName ==="editor" && <li><NavLink to="/myarticles" 
              className={({isActive})=>{return isActive ? "text-gray-400" : "hover:text-gray-400";}}>myArticles</NavLink></li> }


              <li><a  className="hover:text-gray-400 cursor-pointer" onClick={()=>{
                localStorage.setItem("token","")    
                navigate("/home")
                window.location.reload()
              }}>logout</a></li>
          </>
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
