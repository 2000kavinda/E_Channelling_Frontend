import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/firebase';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageUpload = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [formData, setFormData] = useState({
        regNo: 9948630,
        email: "jeraye6801@givehit.com",
        password: "124563",
        role: "DOCTOR",
        code: "***%%%%*",
        drame: "Kavinda",
        specialize: "2000-01-01",
        type: "Male",
        profileImage: "abc",
        drQualification: "abc"
    });
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/e-channelling-10dc6.appspot.com/o/images%2F123.png?alt=media&token=16c311df-34fe-4dbc-ada4-1d6fb17e0291'; // Default image URL


    const handleChange = (e) => {
        const currentDate = new Date();

        const image = e.target.files[0];
        if (image) {
            const storageRef = ref(storage, `images/${currentDate.toISOString()}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.error(error);
                    toast.error('Image upload failed!');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at:', downloadURL); 
                        setUrl(downloadURL);
                        setFormData((prevData) => ({
                            ...prevData,
                            profileImage: downloadURL
                        }));
                        //toast.success('Image uploaded successfully!');
                        toast.success(downloadURL);
                    });
                }
            );
        }
    };


    return (
        <div>
            
            <img src={url || defaultImage} alt="Uploaded file" width="150" height="150" />
            <input type="file" onChange={handleChange} />
            <ToastContainer />

        </div>
    );
};

export default ImageUpload;
