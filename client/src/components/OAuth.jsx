import React from 'react';
import {GoogleAuthProvider ,getAuth} from "firebase/auth"
import { app } from '../Firebase';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import{ signinSuccess } from '../../redux/user/UserSlice.js';
import { useNavigate } from 'react-router-dom';

function OAuth(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleGoogleClick() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google',{
                method :'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    photo : result.user.photoURL
                })
            });
            const data = await res.json();
            dispatch(signinSuccess(data));
            navigate('/');
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        
        <button onClick={handleGoogleClick} type='button' className='bg-custom_green-300 text-white p-3 rounded-lg uppercase hover:opacity-95 max-w-lg'>Google</button>
        
    );
}

export default OAuth;