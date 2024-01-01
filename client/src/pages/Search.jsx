import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Search(props) {
    const[sidebarData,setsidebardata] = useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',
    });
    const navigate = useNavigate();
    const[loading ,setLoading] = useState(false);
    const[listings,setListings] = useState([]);
    console.log(listings)
    
    

    const handleChange =(e) =>{
        e.preventDefault();
        if(e.target.id ==='all' ||e.target.id ==='rent' ||e.target.id ==='sale'){
            setsidebardata({
                ...sidebarData,
                type:e.target.id
            })
        }
        if(e.target.id === 'searchTerm'){
            setsidebardata({
                ...sidebarData,
                searchTerm:e.target.value
            })
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setsidebardata({
                ...sidebarData,
                [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
                
            })
        }
        if(e.target.id === 'sort_order'){
            const sort =e.target.value.split('_')[0] || 'created_at'
            const order =e.target.value.split('_')[1]  || 'desc'
            setsidebardata({
                ...sidebarData,
                sort,
                order
            })

        }
    };

    function handleSubmit(e) {
        
        e.preventDefault();
        const urlParams = new URLSearchParams();   ///Builtin  javascript constructor;
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const searchTermfromURL = urlParams.get('searchTerm');
      const typefromURL = urlParams.get('type');
      const parkingfromURL = urlParams.get('parking');
      const furnishedfromURL = urlParams.get('furnished');
      const offerfromURL = urlParams.get('offer');
      const sortfromURL = urlParams.get('sort');
      const orderfromURL = urlParams.get('order');

        if(
            searchTermfromURL || 
            typefromURL ||
            parkingfromURL ||
            furnishedfromURL ||
            offerfromURL ||
            sortfromURL ||
            orderfromURL
        ){
            setsidebardata({
                searchTerm : searchTermfromURL || '',
                type : typefromURL || 'all',
                parking : parkingfromURL === 'true' ? true : false,
                furnished : furnishedfromURL === 'true' ? true : false,
                offer : offerfromURL  === 'true' ? true : false,
                sort : sortfromURL || 'created_at',
                order : orderfromURL || 'desc'
              });
        }

        const fetchListings =async()=>{
            setLoading(true);
            const searchQuery  = urlParams.toString();
            const res= await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);
        }
        fetchListings();

      
    },[location.search]);


    


    return (
        <div className='flex'>
            <div className='p-7 border-r-2 min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input value={sidebarData.searchTerm} onChange={handleChange} type='text' placeholder='search' id='searchTerm' className='border rounded-lg p-3 w-full' />
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='all' className='w-4' onChange={handleChange} checked={sidebarData.type == 'all'}  />
                        <span>Rent&Sale</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='rent' className='w-4' onChange={handleChange} checked={sidebarData.type == 'rent'}  />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='sale' className='w-4' onChange={handleChange} checked={sidebarData.type == 'sale'}  />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='offer' className='w-4'  onChange={handleChange} checked={sidebarData.offer} />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='parking' className='w-4' onChange={handleChange} checked={sidebarData.parking}   />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='furnished' className='w-4' onChange={handleChange} checked={sidebarData.furnished} />
                        <span >Furnished</span>
                    </div> 
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold' >Sort :</label>
                    <select className='border rounded-lg p-3' id='sort_order' onChange={handleChange} defaultValue={'created_at_desc'}>
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option value='regularPrice_asc'>Price low to high</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
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