import React, { useEffect, useState } from 'react';
import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from "../components/ListingCard.jsx";
import {Link } from 'react-router-dom';
function Home(props) {
    const[offerListings, setOfferListings] = useState([]);
    const[saleListing, setSaleListing] = useState([]);
    const[RentListings, setRentListings] = useState([]);
    SwiperCore.use(Navigation);
    console.log(offerListings);
    
    useEffect(()=>{
        const fetchOfferListings = async () =>{
            try {
                
                const res = await fetch('/api/listing/get?offer=true&limit=4');
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings()

            } catch (error) {
                console.log(error);
            }
        }
        const fetchRentListings = async () =>{
            try {
                
                const res = await fetch('/api/listing/get?type=rent&limit=4');
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            }catch(error){
                console.log(error);
            }   
        }
        
        const fetchSaleListings = async () =>{
            try {
                
                const res = await fetch('/api/listing/get?type=sale&limit=4');
                const data = await res.json();
                setSaleListing(data);
            }catch(error){
                console.log(error);
            }   
        }
        fetchOfferListings();
    },[])

    return (
        <div>
            {/* top */}

            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
                <h1 className='text-6xl text-custom_green-400'>
                    Find your next <span className='text-custom_green-200'>Perfect</span><br/>place with ease
                </h1>
                <div className='text-gray-400'>
                    Real Estate is the best place to find your next perfect place to live.<br/>
                    WE have a wide range of homes to choose from.
                </div>
                <Link className='text-sm text-blue-500 hover:underline font-bold' to ={'/search'}> Let's go ...</Link>
            </div>



            {/* swiper */}
            <Swiper navigation>
            {
                offerListings && offerListings.length>0
                 && offerListings.map((listing) =>(
                    <SwiperSlide key={listing._id}>
                        <div style={{ backgroundImage: `url(${listing.imageUrls[0]})`,backgroundSize:"cover" }} className='h-[500px]' ></div>
                    </SwiperSlide>
                ))
            }

            </Swiper>

            {/* Listing Results */}
            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
            {
                offerListings && offerListings.length>0
                 &&(
                    <div>
                    <div className='my-3'>
                        <h2 className='text-2xl font-semibold text-custom_green-400'>Recent offers</h2>
                        <Link className='text-sm text-blue-500 hover:underline' to={`/search?offer=true`}>Show more offers</Link>
                    </div>
                    <div className='flex flex-wrap gap-32'>
                        {
                            offerListings.map((listing) =>(
                                <ListingItem  listing ={listing}  key={listing._id} />
                            ))
                        }
                    </div>
                    </div>
                 ) 

                 
            }

            {
                RentListings && RentListings.length>0
                 &&(
                    <div>
                    <div className='my-3'>
                        <h2 className='text-2xl font-semibold text-custom_green-400'>Recent places for rent</h2>
                        <Link className='text-sm text-blue-500 hover:underline' to={`/search?type=rent`}>Show more places for rent</Link>
                    </div>
                    <div className='flex flex-wrap gap-32'>
                        {
                            RentListings.map((listing) =>(
                                <ListingItem  listing ={listing}  key={listing._id} />
                            ))
                        }
                    </div>
                    </div>
                 ) 

                 
            }

            {
                saleListing && saleListing.length>0
                 &&(
                    <div>
                    <div className='my-3'>
                        <h2 className='text-2xl font-semibold text-custom_green-400'>Recent places for sale</h2>
                        <Link className='text-sm text-blue-500 hover:underline' to={`/search?offer=true`}>Show more places for sale</Link>
                    </div>
                    <div className='flex flex-wrap gap-32'>
                        {
                            saleListing.map((listing) =>(
                                <ListingItem  listing ={listing}  key={listing._id} />
                            ))
                        }
                    </div>
                    </div>
                 ) 

                 
            }

            </div>
        </div>
    );
}

export default Home;