import { Link } from "react-router-dom"

export default function Header() {
  return (
      <div className='bg-slate-200'>
          <div className='flex justify-between max-w-6xl mx-auto items-center p-2'>
                
                <h1 className='font-bold'><Link to={'/'}>Auth App</Link></h1>
                
                <ul className='flex gap-4'>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                    <li><Link to={'/sign-in'}>Sign IN</Link></li>
                </ul>
          </div>
    </div>
  )
}
