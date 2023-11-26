import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(0);
  // State to store uploaded file
  const [image, setImage] = useState("");
  // progress
  const [percent, setPercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  // form data
  const [formData, setFormData] = useState({});

  const fileRef = useRef(null);
  

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  }

  useEffect(() => {
    if (image)
      handleUpload(image);
  }, [image])

  const handleUpload = async(image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + (image.name).split(" ").join("");
    const storageRef = ref(storage, fileName);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on("state_changed", (snapshot) => {
      const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setPercent(percent);
    }, (error) => {
      console.log(error);
      setImageError(error);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setFormData({ ...formData, profilePicture: url})
      })
    });
  }
  const handleSubmit = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value})
  }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='font-semibold text-center text-xl mt-4'>Profile</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input type='file' accept='image/*' ref={fileRef} onChange={handleChangeImage} hidden/>
        <img src={formData.profilePicture || currentUser.profilePicture} className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' onClick={() => fileRef.current.click()} />
        <p className='self-center'>
        {
            imageError ? (<span className='text-red-500'>Image not able to upload. Try again.</span>) : (percent > 0 && percent < 100 ? (
              <span className='text-slate-500'>Uploading...</span>
          ) : (percent === 100 ? (<span className='text-green-500'>Image uploaded</span>) : '' ))
        }
        </p>
        
        <input type="text" placeholder="Username" id="username" className='p-3 rounded-lg bg-slate-100' defaultValue={currentUser.username} />
        <input type="email" placeholder="Email" id="email" className='p-3 rounded-lg bg-slate-100' defaultValue={currentUser.email} />
        <input type="password" placeholder="Password" id="password" className='p-3 rounded-lg bg-slate-100' />
        <button className='uppercase rounded-lg bg-slate-500 p-3 text-center text-white hover:opacity-90 disabled:opacity-50'>{ loading ? 'Loading...': 'Update Profile'}</button>
      </form>
      <div className='flex justify-between mt-4'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
