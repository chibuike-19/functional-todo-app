import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { useRef, useState, } from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { db } from "../../firebase";


const SignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()
    const nameRef = useRef()
    let navigate = useNavigate()
    const [error, setError] = useState('')

    

    const errorDisplay = () => {
        if(error === '') {
            return ''
        }else {
            return 'text-center rounded-md border-2 bg-red-100 px-3 py-2 mb-10 text-lg'
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(passwordConfRef.current.value !== passwordRef.current.value){
            setError('Passwords do not match')
        }else
        try {
            await createUserWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value).then( userInfo => {
            updateProfile(auth.currentUser, {
                displayName: nameRef.current.value
            })
            setDoc(doc(db, 'users', userInfo.user.uid), {
             UserName: nameRef.current.value,
             email: emailRef.current.value,
             password: passwordRef.current.value,
             timestamp: serverTimestamp()
            })
            console.log(userInfo)
            navigate('/todo')
        }).catch(err => {
            if(err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
                setError('weak password')
            }else if (err.message === "Firebase: Error (auth/invalid-email)."){
                setError('Invalid Email')
            }else if(err.message === 'Firebase: Error (auth/network-request-failed).'){
                setError('Failed to connect, check your internet')
            }
        })
        } catch (error) {
            console.log(error)
        }
            
        
            
        
    }

    return ( 
        <div className=" w-full min-h-screen bg-photo ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl w-fit md:w-lg rounded-md bg-gray-600 opacity-85 p-10">
            <h2 className="mb-8 text-center font-poppins text-white text-4xl">Create New Account</h2>
            <p className={errorDisplay()}>{error}</p>
            <form onSubmit={handleSubmit}>
                <div className="relative ">
                    <input type='text' ref={nameRef} required className="w-full text-green-300 p-1 rounded-sm peer outline-none border-b-2 bg-transparent border-red-200 valid:border-white mb-8 text-lg "/>
                    <label className="absolute peer-focus:-top-6 peer-focus:left-0 peer-focus:text-sm peer-valid:-top-6 top-0 left-0 p-1 text-white text-lg text-blue-500pointer-events-none">Your Name</label>
                </div>
                <div className="relative ">
                    <input type='text' ref={emailRef} required className="w-full text-green-300 p-1 rounded-sm peer outline-none border-b-2 bg-transparent border-red-200 valid:border-white mb-8 text-lg "/>
                    <label className="absolute peer-focus:-top-6 peer-focus:left-0 peer-focus:text-sm peer-valid:-top-6 top-0 left-0 p-1 text-white text-lg text-blue-500pointer-events-none">Email</label>
                </div>
                <div className="relative">
                    <input type='password' ref={passwordRef} required className="w-full p-1 outline-none border-b-2 text-green-300  peer bg-transparent rounded-sm border-red-200 valid:border-white mb-8" />
                    <label className="absolute top-0 left-0 p-1 text-lg text-white transition-all peer-focus:-top-6 peer-focus:text-sm peer-valid:-top-6 peer-focus:left-0 pointer-events-none">Password</label>
                </div>
                <div className="relative">
                    <input type='password' ref={passwordConfRef} required className="w-full p-1 outline-none border-b-2 text-green-300 peer bg-transparent rounded-sm border-red-200 valid:border-white mb-8" />
                    <label className="absolute top-0 left-0 p-1 text-lg text-white transition-all peer-focus:-top-6 peer-focus:text-sm peer-valid:-top-6 peer-focus:left-0 pointer-events-none">Confirm Password</label>
                </div>
                 <div className='flex justify-center mt-2'><button className="border-gray-200 bg-gray-200 text-black px-32 md:px-40 text-lg rounded-2xl focus:bg-gray-600 py-1 border-2">Sign Up</button></div>
                <div className="flex justify-center mt-2"><p className="text-white mt-1">Already have an Account? <Link to='/login' className="text-green-300 ml-1 hover:underline">Sign In</Link></p></div>
            </form>
        </div>
    </div>
    );
}
 
export default SignUp;