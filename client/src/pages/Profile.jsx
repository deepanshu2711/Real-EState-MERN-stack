import React from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { signinStart, signinSuccess, signinFailure } from '../../redux/user/UserSlice.js';

function Profile(props) {
    const {currentUser} = useSelector((state) => state.user);
    return (
        <div className='flex w-full h-screen'>
            <div className='w-1/3 bg-custom_green-400 bg-opacity-80 h-screen flex flex-col gap-4'>
                <img className='rounded-full h-40 w-40 object-cover self-center mt-12 border border-slate-950' src={currentUser.avatar} alt='profile image' />
                <h1 className='text-center text-white font-semibold text-2xl'>{currentUser.username}</h1>
                <h1 className='text-center text-white font-bold text-2xl '>{currentUser.email}</h1>
                <div className='flex justify-between p-7 mt-48'>
                    <span className='cursor-pointer bg-red-500 p-1 text-white rounded-lg'>Delete Account</span>
                    <span className='cursor-pointer bg-custom_green-300 text-white p-1 rounded-lg'>Sign Out</span>
                </div>
            </div>
            <div className='flex flex-col w-2/3 justify-start items-center mt-4 gap-48  '>
                <h1 className='text-3xl text-center font-bold text-custom_green-400'>Profile</h1>
                <form className='flex flex-col gap-3'>
                    <input id='username' type='text' placeholder='username' className='border border-black p-3 rounded-lg '/>
                    <input id='email' type='text' placeholder='email' className='border p-3 border-black rounded-lg '/>
                    <input id='password' type='text' placeholder='password' className='border p-3 border-black rounded-lg '/>
                    <button className='bg-custom_green-400 text-white p-3 rounded-lg uppercase hover:opacity-95'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Profile;