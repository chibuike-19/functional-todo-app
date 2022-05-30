import { useRef, useState } from "react";
import { useAuth } from "../../context";
import { Link } from "react-router-dom";

const PasswordReset = () => {
    const emailRef = useRef()
    const [error, setError] = useState('')
    const { sendPasswordReset } = useAuth()
    
    const errorDisplay = () => {
        if(error === '') {
            return ''
        }else {
            return 'text-center border-2 bg-red-100 px-3 py-2 mb-10 text-lg'
        }
        
    }
    const handleReset = async () => {
        try {
            await sendPasswordReset(emailRef.current.value)
        } catch  {
            setError('')
            setError('Unable to send reset link')
        }
    }
    return ( 
        <div className="w-full min-h-screen bg-photo">
            <div className="absolute bg-gray-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl sm:w-fit w-11/12 md:w-lg rounded-md p-10 ">
                <h2 className="mb-8 text-center text-white text-4xl sm:text-5xl">Reset Password</h2>
                <p className={errorDisplay()}>{error}</p>
                <div className="relative flex justify-center">
                    <input type='text' ref={emailRef} required className=" text-yellow-500 w-full p-1 rounded-sm peer outline-none border-b-2 bg-transparent border-red-200 valid:border-white mb-8 text-lg "/>
                    <label className="absolute peer-focus:-top-6 peer-focus:left-0 peer-focus:text-sm peer-valid:-top-6 top-0 left-0  p-1 text-white text-lg text-blue-500pointer-events-none">Email</label>
                </div>
                <div className="flex justify-center"><button onClick={handleReset} className="border-white border-2  rounded-2xl px-6 py-1 bg-gray-200 text-lg">Reset Password</button></div>
                <p className='text-center text-green-300 hover:underline pt-2 text-lg'><Link to='/login'>Sign In</Link></p>
                <p className='text-center text-white mt-3'>Don't Have an Account? <Link to='/sign-up' className="ml-1 text-green-300 hover:underline">Sign Up</Link></p>
            </div>
        </div> 
    );
}
 
export default PasswordReset;