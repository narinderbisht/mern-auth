import { Link, Route } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  //console.log(currentUser);
  return (
      <div className='bg-slate-200'>
          <div className='flex justify-between max-w-6xl mx-auto items-center p-2'>
                
                <h1 className='font-bold'><Link to={'/'}>Auth App</Link></h1>
                
                <ul className='flex gap-4'>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                    { currentUser ? 
                      <li><Link to={'/profile'}><img src={currentUser.profilePicture} className="rounded-full h-7 w-7 outline"/></Link></li>
                    : <li><Link to={'/sign-in'}>Sign IN</Link></li>
                    }
                    
                </ul>
          </div>
    </div>
  )
}
