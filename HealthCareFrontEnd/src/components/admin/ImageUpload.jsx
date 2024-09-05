import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageUpload = () => {
    const [url, setUrl] = useState('');
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
                    // You can add a progress bar if needed using `setProgress(progress)`.
                },
                (error) => {
                    console.error(error);
                    toast.error('Image upload failed!');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL);
                        localStorage.setItem('url', downloadURL);
                        toast.success(downloadURL);
                    });
                }
            );
        }
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div>
            {/* Profile Picture */}
            <div className="flex flex-row h-[120px] w-full items-center gap-5 justify-center">
                <div className="w-[120px] h-[120px] bg-black rounded-full overflow-hidden">
                    <img
                        src={url || defaultImage}
                        alt="Uploaded file"
                        className="object-cover w-full h-full"
                    />
                </div>

                <button
                    className="w-[120px] h-[40px] py-2 bg-[#005F7E] rounded-lg text-white text-sm font-semibold"
                    onClick={handleButtonClick}
                >
                    Upload
                </button>
            </div>

            <input
                id="fileInput"
                type="file"
                onChange={handleChange}
                style={{ display: 'none' }}
            />

            <ToastContainer />
        </div>
    );
};

export default ImageUpload;
