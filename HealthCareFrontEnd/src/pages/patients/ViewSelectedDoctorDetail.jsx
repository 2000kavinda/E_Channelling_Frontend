import React, { useEffect, useState } from 'react';
import { getDoctorDetails } from '../../service/pDoctorDeatilService';
import NavBar from '../../components/header/NavBar';
import selecteddoctor from '../../assets/Images/selecteddoctor.png';
const DoctorDetails = () => {
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        getDoctorDetails()
            .then(data => setDoctor(data))
            .catch(error => console.error(error));
    }, []);

    if (!doctor) {
        return <div>Loading...
            
        </div>;
    }

    return (
        <div className='flex flex-col w-screen h-full'>
        <NavBar/>
         {/* Add the image here */}
<div className="flex justify-center mt-6">
<img src={selecteddoctor} alt="Doctor Booking Details" className="w-full h-auto"/>
</div>
        
        <div style={styles.container}>
            <img src={doctor.profilepic} alt="Doctor Profile" style={styles.profilePic} />
            <h1 style={styles.name}>{doctor.name}</h1>
            <h2 style={styles.specialization}>{doctor.specialization.toUpperCase()}</h2>
            <h3 style={styles.regNo}>Reg No {doctor.doctorRegNo}</h3>
            <div style={styles.sectionTitle}>Biography</div>
            <p style={styles.biography}>{doctor.biography}</p>
            <div style={styles.sectionTitle}>Credentials</div>
            <p style={styles.credentials}>{doctor.credentials}</p>
            <div style={styles.sectionTitle}>Contact Information</div>
            <p>Email: {doctor.email}</p>
            <p>Phone: {doctor.phone}</p>
            <p>Office Address: {doctor.address}</p>
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