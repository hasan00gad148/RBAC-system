import React from 'react'
import { useAppSelector } from '../store/userStore';
import { Button } from '../components/index';
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate()
  console.log(user)
  return (
    <main className="flex flex-col items-center justify-center flex-1 w-full px-4 ">
    <section className="bg-white shadow rounded-lg p-6 w-full max-w-2xl mt-6 border border-green-600">
      <h2 className="text-2xl font-semibold text-gray-800">About Us</h2>
      <p className="text-gray-600 mt-2">
        At HappyNews, we believe in spreading positivity and joy. Our mission is to bring you the latest and greatest news that will brighten your day.
      </p>
    </section>
    <section className="bg-white shadow rounded-lg p-6 w-full max-w-2xl mt-6 border border-green-600">
      <h2 className="text-2xl font-semibold text-gray-800">Get Started</h2>
      <p className="text-gray-600 mt-2">
        Explore our latest articles, share your favorite stories, and join our community of happy readers.
      </p>
      {user.isLoggedIn?
      (<div className='text-center'>
          <Button name={'latest articles'} className={''} onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
              event.preventDefault();
              navigate("/articles");
            } }/>

      </div>):
      (<div className='flex justify-center gap-4'>
          <Button name={'login'} className={''} onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
              event.preventDefault();
              navigate("/login");
            } }/>
          <Button name={'register'} className={''} onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
              event.preventDefault();
              navigate("/register")
            } }/>
      </div>)}
    </section>
  </main>

  )
}

export default Home