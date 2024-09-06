import './FloatingButton.css'; // Create this file for styling
import { IoIosChatbubbles } from "react-icons/io";

const FloatingButton = ({ onClick }) => {
    return (
        <button className="floating-button" onClick={onClick}>
            <IoIosChatbubbles />
        </button>
    );
};

export default FloatingButton;
