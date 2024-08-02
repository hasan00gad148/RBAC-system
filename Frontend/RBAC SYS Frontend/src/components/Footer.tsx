import React from 'react';
import { SocialIcon } from 'react-social-icons';


const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white p-4 shrink-0 fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Alhasan Gad</h2>
          <p className="text-gray-400">© 2024 Alhasan Gad. All rights reserved.</p>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><SocialIcon url="https://www.linkedin.com/in/alhassan-gad-1b8052193/" className="hover:text-gray-300"/></li>
            <li><SocialIcon url="https://leetcode.com/u/hassan178tv/" className="hover:text-gray-300"/></li>
            <li><SocialIcon url="https://github.com/hasan00gad148" className="hover:text-gray-300"/></li>
            <li><SocialIcon url="mailto:hassan178tv@gmail.com" className="hover:text-gray-300"/></li>
            {/* <li><SocialIcon url="#!" className="hover:text-gray-300"/></li> */}
            
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
