import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { signinSuccess, signinFaliure } from '../redux/slice/user';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthButton() {
    const dispatch = useDispatch();
    const navigate =  useNavigate();
    
    const handleButtonClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            
            console.log(result);
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            };
            const res = await fetch('/api/auth/google', options);
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
            //console.log('Google auth login error ' + error);
        }
        
        
    }
  return (
    <button type='button' onClick={handleButtonClick} className='bg-red-400 text-center text-white rounded-lg p-3 hover:opacity-80 uppercase'>SignIn with Google</button>
  )
}
