import React from 'react';

function Search(props) {
    return (
        <div className='flex'>
            <div className='p-7 border-r-2 min-h-screen'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input type='text' placeholder='search' id='searcTerm' className='border rounded-lg p-3 w-full' />
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='all' className='w-4'  />
                        <span>Rent&Sale</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='rent' className='w-4'  />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='sale' className='w-4'  />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='offer' className='w-4'  />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='parking' className='w-4'  />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='furnished' className='w-4'  />
                        <span >Furnished</span>
                    </div> 
                </div>
                <div className='flex items-center gap-2'>
                    <lable className='font-semibold' >Sort :</lable>
                    <select className='border rounded-lg p-3' id='sort_order'>
                        <option>Price high to low</option>
                        <option>Price low to high</option>
                        <option>Latest</option>
                        <option>Oldest</option>
                    </select>
                </div>
                <button className='bg-custom_green-400 p-3 rounded-lg text-white w-full uppercase hover:opacity-95'>Search</button>
            </form>
            </div>
            <div className=''>
                <h1 className='text-3xl font-semibold border-b p-3 text-custom_green-400 mt-5'>
                    Listing Results:
                </h1>
            </div>
        </div>
    );
}

export default Search;