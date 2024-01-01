import React from 'react';
import { Link } from 'react-router-dom';
import {MdLocationOn} from 'react-icons/md';

export default function ListingItem({ listing }) {
    return (
        <div className='border shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[500px]'>
            <Link to={`/listing/${listing._id}`}>
                <img
                    className="h-[320px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                />
                <div className='p-3 flex flex-col gap-2 w-full'> 
                    <p className='text-lg font-semibold text-custom_green-400 truncate'>{listing.name}</p>
                    <div className='flex gap-2 items-center'>
                        <MdLocationOn className='h-4 w-4 text-green-700' />
                        <p className='text-gray-700  text-sm'>{listing.address}</p>
                    </div>
                    <p className='line-clamp-2 text-gray-700'>{listing.description}</p>
                    <p className='text-slate-500 mt-2 font-semibold'>
                        ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </p>
                    <div>
                        <div className='font-bold text-xs text-slate-700'>
                            {listing.bedrooms > 1
                                ? `${listing.bedrooms} Bedrooms`
                                : '1 Bedroom'}
                            {listing.bathrooms > 1
                                ? ` ${listing.bathrooms} Bathrooms`
                                : ' 1 Bathroom'}
                        </div>
                    </div>
                </div>
            </Link>                    
        </div>
    );
}

