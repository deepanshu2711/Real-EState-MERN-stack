import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Contact({listing}) {
    const[landLord , setlandlord] = useState(null);
    const [Message,setMessage] = useState("");

    function onchange(e) {
        setMessage(e.target.value)
    }
    useEffect(()=>{
        const fetchlandLord =async() =>{
        try {
                const response = await fetch(`/api/user/${listing.userRef}`);
                const data = await response.json();
                setlandlord(data);
            }
         catch (error) {
            console.log(error);
        }}
        fetchlandLord();
    },[listing.userRef])
    return (
        <div>
            {landLord &&(
                <div className='flex gap-2 flex-col'>
                    <p>Contact <span className='font-semibold'>{landLord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                    <textarea placeholder='Enter your message here' className='w-full border p-3 rounded-lg' name='message' id='message' onChange={onchange} value={Message} rows={2}></textarea>
                    <Link to={`mailto:${landLord.email}?Subject= Regarding ${listing.name}&body=${Message}`} className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover: opacity-95'>
                        Send Message
                    </Link>
                </div>

            )}
        </div>
    );
}

export default Contact;