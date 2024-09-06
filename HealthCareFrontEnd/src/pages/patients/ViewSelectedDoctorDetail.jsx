import React, { useEffect, useState } from 'react';
import { getDoctorDetails } from '../../service/pDoctorDeatilService';
import NavBar from '../../components/header/NavBar';
import selecteddoctor from '../../assets/Images/selecteddoctor.png';
import { useLocation } from 'react-router-dom';

const DoctorDetails = () => {
    const location = useLocation();
    const { doctor } = location.state || {};
    const [doctors, setDoctors] = useState(null);

    // Log to check if doctor is coming from location.state
    console.log("Doctor from location:", doctor);

    localStorage.setItem("drR", doctor?.drRegNo);

    useEffect(() => {
        getDoctorDetails()
            .then(data => {
                console.log("Doctor Details Data:", data); // Check what data is returned
                setDoctors(data);
            })
            .catch(error => console.error(error));
    }, []);

    // Check for both doctor and doctors before rendering
    if (!doctor || !doctors) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col w-screen h-full'>
            <NavBar />
            <div className="flex justify-center mt-6">
                <img src={selecteddoctor} alt="Doctor Booking Details" className="w-full h-auto" />
            </div>

            <div style={styles.container}>
                <img src={doctors.profilepic} alt="Doctor Profile" style={styles.profilePic} />
                <h1 style={styles.name}>{doctors.name}</h1>
                <h2 style={styles.specialization}>{doctors.specialization?.toUpperCase()}</h2>
                <h3 style={styles.regNo}>Reg No {doctors.doctorRegNo}</h3>
                <div style={styles.sectionTitle}>Biography</div>
                <p style={styles.biography}>{doctors.biography}</p>
                <div style={styles.sectionTitle}>Credentials</div>
                <p style={styles.credentials}>{doctors.credentials}</p>
                <div style={styles.sectionTitle}>Contact Information</div>
                <p>Email: {doctors.email}</p>
                <p>Phone: {doctors.phone}</p>
                <p>Office Address: {doctors.address}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '80px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid green',
        borderRadius: '10px',
    },
    profilePic: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        marginBottom: '20px',
    },
    name: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    specialization: {
        fontSize: '20px',
        color: 'gray',
    },
    regNo: {
        fontSize: '16px',
        color: 'gray',
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        backgroundColor: '#00796b',
        color: 'white',
        padding: '5px',
        borderRadius: '5px',
        marginTop: '20px',
        marginBottom: '10px',
    },
    biography: {
        fontSize: '16px',
        lineHeight: '1.5',
    },
    credentials: {
        fontSize: '16px',
        lineHeight: '1.5',
    }
};

export default DoctorDetails;
