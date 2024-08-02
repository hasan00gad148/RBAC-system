import React from 'react'
import { Outlet } from 'react-router-dom'


function Container() {
  return (
    <div className='w-full bg-slate-100 p-8 mx-auto flex-1 text-wrap'>
      <Outlet/>
    </div>
  )
}

export default Container