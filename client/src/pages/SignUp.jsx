import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState([]);
  const [ loading, setLoading ] = useState('');
  const [ error, setError ] = useState('');
  const handleFormData = ( e ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log(formData);
    
    try {
      setLoading(true);
      setError(false);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      };
      const res = await fetch('/api/auth/signup', options);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(true);
        setLoading(false);
      } else {
        setError(false);
        setLoading(false);
      }
      navigate('/sign-in');
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center font-semibold my-3 text-lg'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input type="text" placeholder="Username" id="username" className='p-3 rounded-lg bg-slate-100' onChange={handleFormData} />
        <input type="email" placeholder="Email" id="email" className='p-3 rounded-lg bg-slate-100' onChange={handleFormData} />
        <input type="password" placeholder="Password" id="password" className='p-3 rounded-lg bg-slate-100' onChange={handleFormData} />
        <button disabled={loading} className='uppercase rounded-lg bg-slate-500 p-3 text-center text-white hover:opacity-90 disabled:opacity-50'>{ loading ? 'Loading...': 'Sign UP'}</button>
      </form>
      <div className='flex gap-2 mt-2'>
        <p>Have an account ?</p>
        <Link to={'/sign-in'}><span className='text-blue-300'>Sign In</span></Link>
      </div>
      {
        error && <p className='text-red-500'>Something went wrong!</p>
      }
      
    </div>
  )
}
