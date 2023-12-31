import {Swiper ,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';

import React, { useEffect , useState} from 'react';
import {useParams} from "react-router-dom"
import { useSelector } from 'react-redux';
function Listing(props) {
    SwiperCore.use(Navigation);
    const params = useParams();
    const[listing , setListing] = useState(null);
    const[loading , setLoading] = useState(false);
    const[error ,seterror] = useState(false);
    

    useEffect(()=>{
        const fetchListing =async() =>{
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false){
                seterror(true);
                setLoading(false);
                return;
            }
            setListing(data);
            setLoading(false);

            } catch (error) {
             seterror(true)   
             setLoading(false);

            }
        }

        fetchListing()
    },[])


    return (
        <main>
        {loading && <p className='text-center my-7'>Loading...</p>}
        {error && <p className='text-center my-7'>Error...</p>}
        {listing && !loading && !error&& (
            <div>
                <Swiper navigation>
                    {listing.imageUrls.map((url , index) => (
                        <SwiperSlide key={index}>
                        <div className='h-[500px]' style={{background:`url(${url}) center no-repeat`, backgroundSize:'auto'}}>
                        <img
                            src={url}
                            className="swiperSlideDiv"
                            />
                        </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            </div>
            
            </div>

        )}
        </main>
    );
}

export default Listing;