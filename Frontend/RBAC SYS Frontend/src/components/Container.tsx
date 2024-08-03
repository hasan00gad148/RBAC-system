import React from 'react'
import { Outlet } from 'react-router-dom'


function Container() {
  return (
    <div className='w-screan h-screen bg-slate-100 p-8 mx-auto flex-1 text-wrap text-center box-content'>
      <Outlet/>
    </div>
  )
}

export default Container