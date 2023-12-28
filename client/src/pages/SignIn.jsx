import React, { useState } from 'react';
import {Link ,useNavigate } from "react-router-dom";
import { useDispatch ,useSelector } from 'react-redux';
import { signinStart, signinSuccess, signinFailure } from '../../redux/user/UserSlice.js';
import OAuth from '../components/OAuth.jsx';


function SignIn(props) {
    const[formdata ,setformdata] = useState({});
    const {loading ,error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handelChange(e) {
        setformdata({
            ...formdata ,
            [e.target.id] : e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            dispatch(signinStart());
            const res = await fetch("/api/auth/signin" ,{                         //added proxy in vite.config.js
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formdata)
            }); 
            const data = await res.json();  
            
            if(data.success === false){
                dispatch(signinFailure(data));
                return;
            }
            dispatch(signinSuccess(data));
            navigate("/");
        } catch (error) {
            dispatch(signinFailure(error.message));
            
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto' >
            <h1 className='text-custom_green-400 text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                
                <input id='email' type='email' placeholder='email' className='border border-gray-900 p-3 rounded-lg' onChange={handelChange}/>
                <input id='password' type='text' placeholder='password' className='border border-gray-900 p-3 rounded-lg' onChange={handelChange}/>
                <button className='bg-custom_green-400 text-white p-3 rounded-lg uppercase hover:opacity-95'>{loading ? "loading..." : "Sign In"}</button>
                <OAuth />
            </form>
            <div className='flex gap-2 mt-5'>
                <p> dont have an account ?</p>
                <Link to ='/signup'>
                    <span className='text-green-700'>Sign Up</span>
                </Link>
            </div>
            <div>
                <p className='text-red-500 text-center mt-12'>{error && error.message}</p>
            </div>
        </div>
    );
}

export default SignIn;