import { IoNotificationsOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { GrNext } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';
import { listNotifications, deleteNotification } from "../../service/PNotificationServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PatientNotifications() {
  const divRef = useRef(null);
  const bottomRef = useRef(null);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const doctorId = 2;
    const toastId = 'unique-toast-id';
    listNotifications(doctorId)
      .then((response) => {
        console.log(response.data); // Check the data structure
        setNotifications(response.data);
        if (!toast.isActive(toastId)) {
          toast.success('Notifications loaded successfully!', { toastId });
        }
      })
      .catch((error) => {
        console.error(error);
        if (!toast.isActive(toastId)) {
          toast.error('Failed to load notifications!', { toastId });
        }
      });
  }, []);

  const handleDelete = (notificationId) => {
    deleteNotification(notificationId)
      .then(() => {
        setNotifications(notifications.filter(notification => notification.id !== notificationId));
        toast.success('Notification deleted successfully!');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete notification!');
      });
  };

  return (
    <div className="flex flex-col px-10 pt-10">
      <ToastContainer />
      <div className="flex flex-row justify-between w-full">
        {/* Greeting message */}
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-[#00394C]">Today Notification List</div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-10">
          {/* Single Button */}
          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><IoNotificationsOutline className="w-5 h-5 text-[#00394C]" /></div>
            <div className="text-base font-semibold text-[#00394C]">Alerts</div>
          </button>

          {/* Single Button */}
          <button className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex flex-col items-center justify-center"><FaQuestion className="w-5 h-5 text-[#00394C]" /></div>
            <div className="text-base font-semibold text-[#00394C]">Help</div>
          </button>

          {/* Single Button */}
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
          placeholder="Search Patients Notifications ..."
          className="px-4 py-2 bg-[#f1f1f1] text-gray-800 text-sm w-[400px] h-[45px] rounded-md focus:outline-none focus:ring-1 focus:ring-[#00394C]"
        />
        <button
          type="submit"
          className="px-10 py-2 text-white bg-[#005F7E] rounded-md hover:bg-[#3392b1] h-[45px] text-sm"
        >
          Search
        </button>
      </div>

      {/* Notification List */}
      <div className="flex flex-col pt-10">
        <div className="flex flex-col w-full h-full bg-[#E6F2F6] rounded-xl px-4 py-4">
          <div ref={divRef} style={{ overflowY: 'scroll', height: '480px' }}>
            {notifications && notifications.length > 0 ? (
              notifications.map((notificationItem) => (
                <div
                  key={notificationItem.id}
                  className="w-full h-[100px] bg-white rounded-lg flex flex-row justify-between px-4 items-center mb-3"
                >
                  <div className="flex flex-row gap-5">
                    {/* Notification Details */}
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold text-[#666767] flex flex-row gap-2">
                        <div>Title:</div>
                        {notificationItem.title}
                      </div>
                      <div className="flex flex-row gap-4 text-sm text-[#666767]">
                        <div className="flex flex-row">
                          <div className="pr-1">Message:</div>
                          <div>{notificationItem.message}</div>
                        </div>
                        <div className="flex flex-row">
                          <div className="pr-1">Date:</div>
                          <div>{notificationItem.date}</div>
                        </div>
                      </div>
                      <div className="flex flex-row text-sm text-[#666767]">
                        <div className="pr-1">Favorite:</div>
                        <div>{notificationItem.isFavorite ? 'Yes' : 'No'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button onClick={() => handleDelete(notificationItem.id)}>
                    <FaTrash className="text-red-500" />
                  </button>

                  <GrNext />
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center w-full h-full text-lg text-center text-[#005F7E] font-semibold">
                No notifications available
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientNotifications;
