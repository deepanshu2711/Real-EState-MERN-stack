import {FaSearch} from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import{useSelector} from "react-redux"
import { useEffect, useState } from 'react';

function Header(props) {
    const[searchTerm,setsearchTerm] = useState("");
    const navigate = useNavigate();
    const {currentUser} = useSelector((state) => state.user);
    function handleSubmit(e) {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);   ///Builtin  javascript constructor;
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    useEffect(() =>{
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('searchTerm');
        if(searchTerm) {
            setsearchTerm(searchTerm);
        }
    },[location.search]);
    return (
        <header className='bg-custom_green-100 shadow-md '>
        <div className='flex justify-between p-3 max-w-6xl mx-auto items-center'>
        <h1 className='font-bold text-3xl'><span className='text-custom_green-200'>Real</span> <span className='text-custom_green-400'>Estate</span></h1>
            <form className='flex items-center bg-white p-3 rounded-lg' onSubmit={handleSubmit}>
                <input id='search' value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} className=' bg-transparent focus:outline-none' type='text' placeholder='search' />
                <button><FaSearch className='text-custom_green-300' /></button>
            </form>
        <ul className='flex gap-4 font-medium text-custom_green-400'>
            <Link to='/'>
            <li className=' hover:underline cursor-pointer'>Home</li>
            </Link>
            <Link to='/about'>
            <li className=' hover:underline cursor-pointer'>About</li>
            </Link>
            {currentUser ? (
                <Link to='/profile'>
                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile image'/>
                </Link>
            ):(
                <Link to='/signup'>
                <li className=' hover:underline cursor-pointer'>Sign Up</li>
                </Link>
            )
            }
        </ul>
        </div>
            
        </header>
    );
}

export default Header;