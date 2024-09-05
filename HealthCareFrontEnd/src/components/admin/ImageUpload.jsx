import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'; // Assuming the spinner is already created

const ImageUpload = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);  // Loading state
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/e-channelling-10dc6.appspot.com/o/images%2F123.png?alt=media&token=16c311df-34fe-4dbc-ada4-1d6fb17e0291'; // Default image URL

    const handleChange = (e) => {
        const currentDate = new Date();
        const image = e.target.files[0];

        if (image) {
            setLoading(true);  // Start loading
            const storageRef = ref(storage, `images/${currentDate.toISOString()}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    // Optionally, you can set the progress state here if you want to show a progress bar.
                },
                (error) => {
                    console.error(error);
                    toast.error('Image upload failed!');
                    setLoading(false);  // End loading on error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL);
                        localStorage.setItem('url', downloadURL);
                        toast.success('Image uploaded successfully!');
                        setLoading(false);  // End loading on success
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
            <div className="relative flex flex-row h-[120px] w-full items-center gap-5 justify-center">
                {/* Image and Upload Button */}
                <div className="w-[120px] h-[120px] bg-white rounded-full overflow-hidden">
                    <img
                        src={url || defaultImage}
                        alt="Uploaded file"
                        className="object-cover w-full h-full rounded-full"
                    />
                </div>

                <button
                    className="w-[120px] h-[40px] py-2 bg-[#005F7E] rounded-lg text-white text-sm font-semibold"
                    onClick={handleButtonClick}
                    disabled={loading}  // Disable button when loading
                >
                    Upload
                </button>

                {/* Loading Spinner */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                        <LoadingSpinner />
                    </div>
                )}
            </div>

            <input
                id="fileInput"
                type="file"
                onChange={handleChange}
                style={{ display: 'none' }}
                disabled={loading}  // Disable file input when loading
            />

            <ToastContainer />
        </div>
    );
};

export default ImageUpload;
