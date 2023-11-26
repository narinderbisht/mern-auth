import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [ loading, setLoading ] = useState('');
  const handleSubmit = () => {

  }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='font-semibold text-center text-xl mt-4'>Profile</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <img src={currentUser.profilePicture} className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'/>
        <input type="text" placeholder="Username" id="username" className='p-3 rounded-lg bg-slate-100' defaultValue={currentUser.username} />
        <input type="email" placeholder="Email" id="email" className='p-3 rounded-lg bg-slate-100' defaultValue={currentUser.email} />
        <input type="password" placeholder="Password" id="password" className='p-3 rounded-lg bg-slate-100' />
        <button className='uppercase rounded-lg bg-slate-500 p-3 text-center text-white hover:opacity-90 disabled:opacity-50'>{ loading ? 'Loading...': 'Update Profile'}</button>
      </form>
      <div className='flex justify-between mt-4'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
