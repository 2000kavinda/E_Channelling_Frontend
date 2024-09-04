
import NavBar from '../../components/header/NavBar';
import LabImage from '../../assets/Images/LabImage.png';

function PatientLabReport() {
    

    return (
        <div className="flex flex-col px-10 pt-10">
            {/* Navigation Bar */}
            <NavBar />

            {/* Image Section */}
            <div className="flex justify-center my-8">
                <img src={LabImage} alt="Lab" className="w-full h-auto rounded-lg shadow-lg" />
            </div>


           


        </div>
    );
}

export default PatientLabReport;
