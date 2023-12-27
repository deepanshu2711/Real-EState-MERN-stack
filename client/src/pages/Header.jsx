import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className='bg-custom_green-100 shadow-md '>
        <div className='flex justify-between p-3 max-w-6xl mx-auto items-center'>
        <h1 className='font-bold text-3xl'><span className='text-custom_green-200'>Real</span> <span className='text-custom_green-400'>Estate</span></h1>
            <form className='flex items-center bg-white p-3 rounded-lg'>
                <input className=' bg-transparent focus:outline-none' type='text' placeholder='search' />
                <FaSearch className='text-custom_green-300' />
            </form>
        <ul className='flex gap-4 font-medium text-custom_green-400'>
            <Link to='/'>
            <li className=' hover:underline cursor-pointer'>Home</li>
            </Link>
            <Link to='/about'>
            <li className=' hover:underline cursor-pointer'>About</li>
            </Link>
            <Link to='/signin'>
            <li className=' hover:underline cursor-pointer'>Sign In</li>
            </Link>
        </ul>
        </div>
            
        </header>
    );
}

export default Header;