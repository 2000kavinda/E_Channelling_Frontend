import { useEffect, useState, useRef } from 'react';
import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/firebase';
import axios from 'axios';

function LabAppointment() {
  const [services, setServices] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const divRef = useRef(null);
  const bottomRef = useRef(null);
  const [, setUrl] = useState('');
  const [selectedService, setSelectedService] = useState(null); // Track the selected service
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [isUploading, setIsUploading] = useState(false);

  // Fetch all services initially
  useEffect(() => {
    axios.get('http://localhost:8080/Laboratory/appointments')
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  }, []);

  // Fetch filtered services based on search input
  const handleSearch = () => {
    if (searchInput) {
      axios.get(`http://localhost:8080/Laboratory/appointments/${searchInput}`)
        .then((response) => {
          console.log(response.data);
          setServices([response.data]); // Set filtered service
        })
        .catch((error) => {
          console.error("There was an error fetching the filtered services!", error);
        });
    } else {
      // Fetch all services again if the search input is cleared
      axios.get('http://localhost:8080/Laboratory/appointments')
        .then((response) => {
          setServices(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the services!", error);
        });
    }
  };

  // Handle delete functionality with confirmation
  const handleDelete = (serviceNumber) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (confirmDelete) {
      axios.delete(`http://localhost:8080/Laboratory/appointments/${serviceNumber}`)
        .then(() => {
          // Remove the deleted service from the list
          setServices(services.filter(service => service.serviceNumber !== serviceNumber));
        })
        .catch((error) => {
          console.error("There was an error deleting the service!", error);
        });
    }
  };

  // Handle PDF upload
  const handleChange = (e) => {
    const pdf = e.target.files[0];
    if (pdf && selectedService) {
      console.log('Starting upload for file:', pdf.name);
      setIsUploading(true);
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // Format the current date as YYYY-MM-DD
      const storageRef = ref(storage, `pdfs/${currentDate.toISOString()}`);
      const uploadTask = uploadBytesResumable(storageRef, pdf);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculate and update the progress
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
          toast.error('Report upload failed!');
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            // Prepare data for backend POST request
            const postData = {
              pid: selectedService.pacientId,
              serviceName: selectedService.service,
              pdflink: downloadURL,
              uploadpdfname: pdf.name,
              uploaddate: formattedDate,
            };
            // Post to backend
            axios.post('http://localhost:8080/labreports/upload', postData)
              .then(() => {
                toast.success('Report uploaded and saved successfully!');
                setIsUploading(false);
                setUploadProgress(0);
              })
              .catch((error) => {
                console.error("There was an error uploading the report!", error);
                toast.error('Failed to save report!');
                setIsUploading(false);
              });
          });
        }
      );
    }
  };

  const handleButtonClick = (service) => {
    setSelectedService(service); // Set the selected service when the upload button is clicked
    document.getElementById('fileInput').click();
  };

  return (
    <div className="flex flex-col px-10 pt-10">
      <div className="flex flex-row justify-between w-full">
        {/* Greeting message */}
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-[#00394C]">Manage Appointment</div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-10">
          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><IoNotificationsOutline className="w-5 h-5 text-[#00394C]" /></div>
            <div className="text-base font-semibold text-[#00394C]">Alerts</div>
          </button>

          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><FaQuestion className="w-5 h-5 text-[#00394C]" /></div>
            <div className="text-base font-semibold text-[#00394C]">Help</div>
          </button>

          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><IoSettingsOutline className="w-5 h-5 text-[#00394C]" /></div>
            <div className="text-base font-semibold text-[#00394C]">Settings</div>
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex flex-row items-center gap-6 pt-10">
        <input
          type="text"
          placeholder="Enter appointment number.. "
          className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {/* Progress Bar */}
      {isUploading && (
        <div className="flex flex-col items-center mt-4">
          <div className="text-sm text-gray-700">Uploading: {uploadProgress}%</div>
          <div className="w-full bg-gray-200 rounded-full mt-2">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${uploadProgress}%` }}
            >
              &nbsp;
            </div>
          </div>
        </div>
      )}
      {/* Schedule List */}
      <div className="flex flex-col pt-10">
        <div className="flex flex-col w-full h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
          <div ref={divRef} style={{ overflowY: 'scroll', height: '480px' }}>
            {/* Render the service cards dynamically */}
            {services.length > 0 ? services.map((service, index) => (
              <div key={index} className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3">
                <div className="flex flex-row gap-5">
                  {/* Service Details */}
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold text-[#666767]">{service.name}</div>
                    <div className="flex flex-row gap-9 text-sm text-[#666767]">
                    <div className="flex flex-row">
                      <div className="pr-1 font-semibold text-[#666767]">Service: </div>
                      <div className=" font-semibold text-[#666767]">{service.service}</div>
                    </div>
                      <div className="flex flex-row">
                        <div className="pr-1">Time: </div>
                        <div>{service.time}</div>
                      </div>
                      <div className="flex flex-row">
                        <div className="pr-1">Date: </div>
                        <div>{service.date}</div>
                      </div>
                    </div>

                    <div className="flex flex-row text-sm text-[#666767]">
                      <div className="pr-1">Appointment No: </div>
                      <div>{service.appointmentNumber}</div>
                    </div>
                    <div className="flex flex-row gap-9 text-sm text-[#666767]">
                      <div className="flex flex-row">
                        <div className="pr-1">Contact: </div>
                        <div>{service.contact}</div>
                      </div>
                      
                    <div className="flex flex-row">
                        <div className="pr-1">Email: </div>
                        <div>{service.email}</div>
                      </div>
                    </div>
                    
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-row gap-4">
                  {/* Upload Report button */}
                  <button
                    className="bg-[#3392b1] text-white text-sm font-medium px-6 py-2 rounded-md hover:bg-[#287586]"
                    onClick={() => handleButtonClick(service)}
                  >
                    Upload Report
                  </button>

                  {/* Delete button */}
                  <button
                    className="bg-red-500 text-white text-sm font-medium px-6 py-2 rounded-md hover:bg-red-700"
                    onClick={() => handleDelete(service.serviceNumber)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-500 py-4">No appointments found.</div>
            )}
          </div>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleChange}
        accept=".pdf"
      />

      <ToastContainer />
    </div>
  );
}

export default LabAppointment;
