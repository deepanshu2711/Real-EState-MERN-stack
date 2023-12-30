import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../Firebase.js';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

function CreateListing(props) {
    const [files ,setfiles] = useState([]);
    const[formdata,setformdata] = useState({
        imageUrls:[],
        name:"",
        description :"",
        address :"",
        type:"rent",
        bedrooms:1,
        bathrooms:1,
        regularPrice:50,
        discountPrice:0,
        offer:false,
        parking:false,
        furnished:false
    });
    const[imageUploaderr,setImageUploadError] = useState(false);
    const[uploading,setuploading] = useState(false);
    const[error ,seterror] = useState(false);
    const[Loading ,setLoading] = useState(false);
    const {currentUser} = useSelector((state) => state.user);
    const navigate = useNavigate();

    
    
    function handleImageSubmit(e) {
        e.preventDefault();
        if(files.length>0 && files.length + formdata.imageUrls.length <7){
            setuploading(true);
            setImageUploadError(false);
            const promises = [];
            for(let i = 0; i<files.length ; i++){
                promises.push(storeimage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setformdata({
                    ...formdata,
                    imageUrls:formdata.imageUrls.concat(urls)
                });
                setImageUploadError(false);
                setuploading(false)
            }).catch((err) =>{
                setImageUploadError('Image upload failed');
            })
            }else{
                setImageUploadError('Max 6 images can be uploaded');
                setuploading(false)
            }
        }
    
    

    async function storeimage(file) {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const filename = new Date().getTime() + file.name;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
    })}

    function handelRemoveImage(index) {
        setformdata({
            ...formdata,
            imageUrls: formdata.imageUrls.filter((url, i) => i !== index)
        })
    }

    function handleChange(e) {
        if(e.target.id === 'sale' || e.target.id === 'rent'){
            setformdata({
                ...formdata,
                type: e.target.id
            })
        }
        if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer"){
            setformdata({
                ...formdata,
                [e.target.id]: e.target.checked
            })
        }
        if(e.target.type ==='number' || e.target.type === 'text' || e.target.type == 'textarea'){
            setformdata({
                ...formdata,
                [e.target.id]: e.target.value
            })
        }
    }

     async function handleSubmit(e) {
        e.preventDefault();
        try {
            if(formdata.imageUrls.length < 1){
                seterror('Please upload atleast one image');
                return;
            }
            if(+formdata.regularPrice < +formdata.discountPrice){
                seterror('Discount price should be less than regular price');
                return;
            }
            setLoading(true);
            seterror(false);
            const res = await fetch("/api/listing/create" ,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({...formdata , userRef:currentUser._id})})
                const data = await res.json();
                setLoading(false)
                if(data.success === false){
                    seterror(data.message);
                    setLoading(false);
                    return;
                }
                navigate(`/listing/${data._id}`);

            }   
            catch (error) {
            seterror(error.message);
            setLoading(false)
        }
    }

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7 text-custom_green-400'>Create Listing</h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-6 '>
            <div className='flex flex-col gap-4 flex-1'>
                <input onChange={handleChange} value={formdata.name} type='text' placeholder='name' className='border p-3 rounded-lg border-black' id='name' maxLength={62} minLength={5} required />
                <input onChange={handleChange} value={formdata.description} type='text' placeholder='description' className='border p-3 rounded-lg border-black' id='description'  required />
                <input onChange={handleChange} value={formdata.address} type='text' placeholder='address' className='border p-3 rounded-lg border-black' id='address' required />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2 '>
                        <input type='checkbox' id='sale' className='w-5 border border-black' onChange={handleChange} checked ={formdata.type === 'sale'} />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5 border border-black' onChange={handleChange} checked ={formdata.type === 'rent'} />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5 border border-black' onChange={handleChange} checked ={formdata.parking === true} />
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5 border border-black' onChange={handleChange} checked ={formdata.furnished === true} />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5 border border-black' onChange={handleChange} checked ={formdata.offer === true}  />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex gap-2 items-center'>
                        <input type='number' id='bedrooms' min={1} max={10} required className='p-3 border border-black rounded-lg' onChange={handleChange} value={formdata.bedrooms}/>
                        <span>Bed</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='number' id='bathrooms' min={1} max={10} required className='p-3 border border-black rounded-lg' onChange={handleChange} value={formdata.bathrooms} />
                        <span>Baths</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='number' id='regularPrice' min={50} max={100000} required className='p-3 border border-black rounded-lg' onChange={handleChange} value={formdata.regularPrice} />
                        <div className='flex flex-col'>
                        <span>Regular Price</span>
                        <span className='text-sm'>($/months)</span>
                        </div>
                        
                    </div>
                    {formdata.offer && <div className='flex gap-2 items-center'>
                        <input type='number' id='discountPrice' min={0} max={1000000} required className='p-3 border border-black rounded-lg' onChange={handleChange} value={formdata.discountPrice} />
                        <div className='flex flex-col'>
                        <span>Discount Price</span>
                        <span className='text-sm'>($/months)</span>
                        </div>
                    </div>}
                    
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images :
                <span  className='font-normal text-gray-500 ml-2'>The first image will be the cover (max-6)</span>
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e) =>setfiles(e.target.files)} className='p-3 rounded-lg w-full border border-black' type='file' id='images' accept='image/*' multiple />
                    <button type='button' onClick={handleImageSubmit} className='p-3 text-gray-600 bg-green-300 rounded-lg hover:opacity-95'>{uploading ? 'Uploading...' : 'Upload'}</button>
                </div>
                <p className='text-red-500'>{imageUploaderr && imageUploaderr}</p>
                {
                    formdata.imageUrls.length>0 && formdata.imageUrls.map((url ,index) => <div className='flex justify-between p-3 border items-center'>
                    <img key={url} src={url} alt=';listing image' className='w-20 h-20 rounded-lg object-contain ' />
                    <button type='button' onClick={()=>handelRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                    </div>)
                }
                <button className='p-3 bg-custom_green-400 text-white  rounded-lg hover:opacity-95 '>{Loading ? 'Creating...' : 'Create Listing'}</button>
                <p className='text-red-500'>{error && error}</p>
            </div>
            
            </form>
        </main>
    );
}
export default CreateListing;