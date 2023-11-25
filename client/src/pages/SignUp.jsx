import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center font-semibold my-3 text-lg'>Sign Up</h1>
      <form className='flex flex-col gap-3'>
        <input type="text" placeholder="Username" id="username" className='p-3 rounded-lg bg-slate-100' />
        <input type="email" placeholder="Email" id="email" className='p-3 rounded-lg bg-slate-100' />
        <input type="password" placeholder="Password" id="password" className='p-3 rounded-lg bg-slate-100' />
        <button className='uppercase rounded-lg bg-slate-500 p-3 text-center text-white hover:opacity-90 disabled:opacity-50'>Sign UP</button>
      </form>
      <div className='flex gap-2 mt-2'>
        <p>Have an account ?</p>
        <Link to={'/sign-in'}><span className='text-blue-300'>Sign In</span></Link>
      </div>
    </div>
  )
}
