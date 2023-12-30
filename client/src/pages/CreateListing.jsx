import React from 'react';

function CreateListing(props) {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7 text-custom_green-400'>Create Listing</h1>
            <form className='flex flex-col sm:flex-row gap-6 '>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='name' className='border p-3 rounded-lg border-black' id='name' maxLength={62} minLength={5} required />
                <input type='text' placeholder='description' className='border p-3 rounded-lg border-black' id='description'  required />
                <input type='text' placeholder='address' className='border p-3 rounded-lg border-black' id='address' required />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2 '>
                        <input type='cheakbox' id='sale' className='w-5 border border-black' />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='cheakbox' id='rent' className='w-5 border border-black' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='cheakbox' id='parking ' className='w-5 border border-black' />
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='cheakbox' id='furnished' className='w-5 border border-black' />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='cheakbox' id='offer' className='w-5 border border-black' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex gap-2 items-center'>
                        <input type='number' id='bedrooms' min={1} max={10} required className='p-3 border border-black rounded-lg' />
                        <span>Bed</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='number' id='bathrooms' min={1} max={10} required className='p-3 border border-black rounded-lg' />
                        <span>Baths</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='number' id='regularPrice' min={1} max={10} required className='p-3 border border-black rounded-lg' />
                        <div className='flex flex-col'>
                        <span>Regular Price</span>
                        <span className='text-sm'>($/months)</span>
                        </div>
                        
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='number' id='discontPrice' min={1} max={10} required className='p-3 border border-black rounded-lg' />
                        <div className='flex flex-col'>
                        <span>Discount Price</span>
                        <span className='text-sm'>($/months)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images :
                <span  className='font-normal text-gray-500 ml-2'>The first image will be the cover (max-6)</span>
                </p>
                <div className='flex gap-4'>
                    <input className='p-3 rounded-lg w-full border border-black' type='file' id='images' accept='image/*' multiple />
                    <button className='p-3 text-gray-600 bg-green-300 rounded-lg hover:opacity-95'>Upload</button>
                </div>
                <button className='p-3 bg-custom_green-400 text-white  rounded-lg hover:opacity-95 hover:opacity-95'>CREATE LISTING</button>
            </div>
            
            </form>
        </main>
    );
}

export default CreateListing;