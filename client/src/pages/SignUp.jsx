import React, { useState } from 'react';
import {Link ,useNavigate } from "react-router-dom";
import OAuth from '../components/OAuth.jsx';


function SignUp(props) {
    const[formdata ,setformdata] = useState({});
    const[error ,seterror] = useState(null);
    const[loading,setloading] = useState(false);
    const navigate = useNavigate();

    function handelChange(e) {
        setformdata({
            ...formdata ,
            [e.target.id] : e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setloading(true);
            seterror(false);
            const res = await fetch("/api/auth/signup" ,{                         //added proxy in vite.config.js
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formdata)
            }); 
            const data = await res.json();  
            
            if(data.success === false){
                seterror(data.message);
                setloading(false);
                return;
            }
            setloading(false);
            seterror(false);
            navigate("/signin");
        } catch (error) {
            setloading(false);
            seterror(true);
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto' >
            <h1 className='text-custom_green-400 text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                <input id='username' type='text' placeholder='username' className='border border-gray-900 p-3 rounded-lg' onChange={handelChange}/>
                <input id='email' type='email' placeholder='email' className='border border-gray-900 p-3 rounded-lg' onChange={handelChange}/>
                <input id='password' type='text' placeholder='password' className='border border-gray-900 p-3 rounded-lg' onChange={handelChange}/>
                <button className='bg-custom_green-400 text-white p-3 rounded-lg uppercase hover:opacity-95'>{loading ? "loading..." : "Sign Up"}</button>
                <OAuth />
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account ?</p>
                <Link to ='/signin'>
                    <span className='text-green-700'>Sign In</span>
                </Link>
            </div>
            <div>
                <p className='text-red-500 text-center mt-12'>{error && "something went wrong" }</p>
            </div>
        </div>
    );
}

export default SignUp;