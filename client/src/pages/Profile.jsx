import React from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import{Link} from "react-router-dom";
import { signinStart, signinSuccess, signinFailure, 
    updateUserStart, updateUserSuccess, updateUserFailure,
    deleteUserStart,deleteUserSuccess,deleteUserFailure,
    SignoutUserStart,SignoutUserSuccess,SignoutUserFailure } from '../../redux/user/UserSlice.js';
import { useRef ,useEffect } from 'react';
import { useState } from 'react';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {app} from "../Firebase.js"

function Profile(props) {
    const[file,setfile] = useState(undefined);
    const {currentUser,loading,error} = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const [filepercentage,setfilepercentage] = useState(0);
    const[fileerreror,setfileerror] = useState(null);
    const[formdata,setformdata] = useState({});
    const[updateSuccess,setpdateSuccess] = useState(false);
    const[showListingerroer,setshowListingerroer] = useState(false);
    const[userListings,setUserListings] = useState([]);
    console.log(userListings);
    
    
    

    function handelFileUpload(file) {
        if (file) {
            const storage = getStorage(app);
            const filename = new Date().getTime() + file.name;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setfilepercentage(Math.round(progress));
                    
                },
                (error)=>{
                    setfileerror(true);
                },
                (async ()=>{
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setformdata({
                            ...formdata,
                            avatar:downloadURL
                        })
                    });
                })
                
        )}
    }

    useEffect(()=>{
        handelFileUpload(file);
    },[file])

    function handleChange(e) {
        setformdata({
            ...formdata,
            [e.target.id]:e.target.value
        })
    }

    async function handlesubmit(e) {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            });
            const data = await res.json();
            if(data.success === false){
                dispatch(updateUserFailure(data));
                return;
            }
            dispatch(updateUserSuccess(data));
            setpdateSuccess(true)
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    }

    async function handleDelete (e) {
        try {
            dispatch(deleteUserStart())
            const res  = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await res.json();
            if(data.success === false){
                dispatch(deleteUserFailure(data));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    }

    async function handleSignout(e) {
        try {
            dispatch(SignoutUserStart())
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            
            if(data.success === false){
                dispatch(SignoutUserFailure(data.message));
                return;
            }
            dispatch(signinSuccess());
        } catch (error) {
            dispatch(SignoutUserFailure(error.message));
        }
    }

    async function handleShowListings(e) {
        
        try {
            setshowListingerroer(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            
            if(data.success === false){
                setshowListingerroer(true);
                return;
            }
            setUserListings(data);
            
        } catch (error) {
            setshowListingerroer(true);                                                   
        }
        
    }

    async function handledeleteListing(listingId) {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await res.json();
            if(data.success === false){
                console.log(data.message);
                return;
            }
            setUserListings((prev) =>prev.filter((listing) => listing._id !== listingId));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex w-full h-screen'>
            <div className=' rounded-xl w-1/3 bg-custom_green-400 bg-opacity-80 h-screen flex flex-col gap-4'>
                
                <input type='file' onChange={(e) => setfile(e.target.files[0])} ref={fileRef} hidden accept='/image/*' />
                <img  onClick={() => fileRef.current.click()} className='rounded-full h-40 w-40 object-cover self-center mt-12 border border-slate-950 cursor-pointer' src={ formdata.avatar ||currentUser.avatar} alt='profile image' />
                
                <p className='text-sm self-center'>
          {fileerreror ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filepercentage > 0 && filepercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filepercentage}%`}</span>
          ) : filepercentage === 100 ? (
            <span className='bg-custom_green-300 text-white p-1 rounded-lg'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
                
                <h1 className='text-center text-white font-semibold text-2xl'>{currentUser.username}</h1>
                <h1 className='text-center text-white font-bold text-2xl '>{currentUser.email}</h1>
                <div className='flex justify-between p-7 mt-48'>
                    <span className='cursor-pointer bg-red-500 p-1 text-white rounded-lg border shadow-md' onClick={handleDelete}>Delete Account</span>
                    <span className='cursor-pointer bg-custom_green-300 text-white p-1 rounded-lg border shadow-md' onClick={handleSignout}>Sign Out</span>
                </div>
            </div>
            <div className='flex flex-col w-1/3 justify-start items-center mt-4 gap-8  '>
                <h1 className='text-3xl text-center font-bold text-custom_green-400'>Profile</h1>
                <form className='flex flex-col gap-3' onSubmit={handlesubmit}>
                    <input defaultValue={currentUser.username} id='username' type='text' placeholder='username' className='border border-black p-3 rounded-lg 'onChange={handleChange}/>
                    <input defaultValue={currentUser.email} id='email' type='text' placeholder='email' className='border p-3 border-black rounded-lg 'onChange={handleChange}/>
                    <input id='password' type='text' placeholder='password' className='border p-3 border-black rounded-lg 'onChange={handleChange}/>
                    <button className='bg-custom_green-400 text-white p-3 rounded-lg uppercase hover:opacity-95'>{loading?"loading...":"update"}</button>
                    <Link className='bg-custom_green-300 p-3 text-white font-bold uppercase rounded-lg text-center border hover:opacity-95' to='/createListing'>
                        <h1>Create Listing</h1>
                    </Link>
                    <p className='text-custom_green-300 mt-3'>{updateSuccess ? "User is updated successfully" : ""}</p>
                </form>
                
            </div>
            <div className='rounded-xl w-1/3 p-3 flex flex-col items-center bg-custom_green-300'>
            <button onClick={handleShowListings} className='w-1/3 h-14 text-custom_green-300 bg-custom_green-100 font-bold p-3 rounded-lg'>Show Listings</button>
            <p>{showListingerroer==true &&"Error showing listings"}</p>
            
            {userListings  && userListings.length >0 &&     
            userListings.map((listing) =>(
                <div key={listing._id} className='bg-white gap-4 w-full flex border  rounded-xl justify-between p-3 items-center mt-2'>
                    <Link to={`/listing/${listing._id}`}>
                        <img className='h-16 w-16 object-contain' src={listing.imageUrls[0]} alt='listingCover' />
                    </Link>
                    <Link  className='hover:underline cursor-pointer flex-1 truncate ' to={`/listing/${listing._id}`}>
                        <p>{listing.name}</p>
                    </Link>
                    <div className='flex flex-col'>
                        <button onClick={()=>handledeleteListing(listing._id)} className='text-red-500 uppercase'>Delete</button>
                        <Link to ={`/updateListing/${listing._id}`}>
                        <button className='text-green-500 uppercase'>edit</button>
                        </Link>
                    </div>
                    
                </div>
            ))}
            </div>
            
        </div>
    );
}

export default Profile;