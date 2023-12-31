import {Swiper ,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation} from 'swiper/modules';
import 'swiper/css/bundle';


import React, { useEffect , useState} from 'react';
import {useParams} from "react-router-dom"
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
                        <div className='h-[500px]' style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}>
                        <img
                            src={url}
                            className="swiperSlideDiv"
                            />
                        </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        )}
        </main>
    );
}

export default Listing;