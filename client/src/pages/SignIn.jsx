import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signinStart, signinSuccess, signinFaliure } from '../redux/slice/user';
import { useDispatch, useSelector } from 'react-redux';
import AuthButton from '../components/AuthButton';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [ formData, setFormData ] = useState([]);
  
  /* 
  const [ loading, setLoading ] = useState('');
  const [ error, setError ] = useState(''); */
  const handleFormData = ( e ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log(formData);
    
    try {
      dispatch(signinStart());
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      };
      const res = await fetch('/api/auth/signin', options);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signinFaliure(data));
        
      } else {
        dispatch(signinSuccess(data));
        navigate('/');
      }
      
      
    } catch (error) {
      dispatch(signinFaliure(error));
    }
  }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center font-semibold my-3 text-lg'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input type="email" placeholder="Email" id="email" className='p-3 rounded-lg bg-slate-100' onChange={handleFormData} />
        <input type="password" placeholder="Password" id="password" className='p-3 rounded-lg bg-slate-100' onChange={handleFormData} />
        <button disabled={loading} className='uppercase rounded-lg bg-slate-500 p-3 text-center text-white hover:opacity-90 disabled:opacity-50'>{loading ? 'Loading...' : 'Sign In'}</button>
        <AuthButton/>
      </form>
      <div className='flex gap-2 mt-2'>
        <p>Haven't an account ?</p>
        <Link to={'/sign-up'}><span className='text-blue-300'>Sign Up</span></Link>
      </div>
      {
        error && <p className='text-red-500'>{ error.message ? error.message : 'Something went wrong' }</p>
      }
      
    </div>
  )
}
