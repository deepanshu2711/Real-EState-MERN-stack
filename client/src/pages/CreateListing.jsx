import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../Firebase.js';

function CreateListing(props) {
    const [files ,setfiles] = useState([]);
    const[formdata,setformdata] = useState({
        imageUrls:[],
    });
    const[imageUploaderr,setImageUploadError] = useState(false);
    const[uploading,setuploading] = useState(false);
    
    
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
                <button className='p-3 bg-custom_green-400 text-white  rounded-lg hover:opacity-95 '>CREATE LISTING</button>
            </div>
            
            </form>
        </main>
    );
}
export default CreateListing;