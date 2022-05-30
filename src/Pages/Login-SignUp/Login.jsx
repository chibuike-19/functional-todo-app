import '../../index.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'

const Login = () => {
    let image = require('../../assests/welcom-photo.png')
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const {login, signInWithGoogle} = useAuth()
    let navigate = useNavigate()

    const errorDisplay = () => {
        if(error === '') {
            return ''
        }else {
            return 'text-center border-2 bg-red-100  py-2 mb-10 text-lg'
        }
        
    }

    const GoogleSignUp = async() => {
        await signInWithGoogle()
        navigate('/todo')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/todo')
            
        } catch (err) {
            if(err.message === 'Firebase: Error (auth/network-request-failed).'){
                setError('failed to connect, check your internet.')

            }else if(err.message === 'Firebase: Error (auth/user-not-found).'){
                setError('Oops email does not exist ')
            }else if(err.message === 'Firebase: Error (auth/wrong-password).'){
                setError('incorrect password')
            }
        }
        
    }

    return(
    <div className=" w-full min-h-max font-poppins bg-photo">
        <div className='w-full hidden md:flex justify-end'><img className='w-44 pr-4 h-52' src={image} alt='bg'/></div>
        <div className="absolute top-1/2 left-1/2 bg-gray-600 opacity-85 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl md:w-lg sm:w-fit w-11/12 rounded-md p-10">
            <h2 className="mb-8 text-center  text-white text-5xl">Login</h2>
                <div className=' flex justify-center cursor-pointer' onClick={GoogleSignUp}><span className='md:px-20 px-4 text-sm sm:px-14 sm:text-lg py-1 flex border-2  text-black bg-gray-200 focus:bg-gray-600 mb-8 rounded-2xl'><FcGoogle className='w-8'/>Sign In with Google</span></div>
            <p className={errorDisplay()} >{error}</p>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                <div className="relative ">
                    <input type='text' ref={emailRef} required className="w-full text-green-300  p-1 rounded-sm peer outline-none  border-b-2 bg-transparent border-red-200 valid:border-white mb-8 text-lg "/>
                    <label className="absolute peer-focus:-top-6 peer-focus:left-0 peer-focus:text-sm peer-valid:-top-6 top-0 left-0 p-1 text-lg text-white pointer-events-none">Email</label>
                </div>
                <div className="relative ">
                    <div className='flex justify-center'><input type='password' ref={passwordRef} required className="w-full p-1 outline-none border-b-2 text-green-300  peer bg-transparent rounded-sm border-red-200 valid:border-white mb-8" />
                    <label className="absolute top-0 left-0 p-1 text-lg text-white transition-all peer-focus:-top-6 peer-focus:text-sm peer-valid:-top-6 peer-focus:left-0 pointer-events-none">Password</label></div>
                </div>
                <div className='flex justify-center mt-3'><button className=" text-black bg-gray-200 px-10 focus:bg-gray-600 sm:px-40 sm:text-lg text-base rounded-2xl py-1 border-2">Sign In</button></div>
                <p className='text-center mt-3 text-green-300 hover:underline'><Link to='/reset-password'>Forgot Password</Link></p>
                <p className='text-center text-white mt-3 text-sm'>Don't Have an Account? <Link to='/sign-up' className='text-green-300 hover:underline ml-1'>Sign Up</Link></p>
            </form>
        </div>
    </div>
    ) ;
}
 
export default Login;