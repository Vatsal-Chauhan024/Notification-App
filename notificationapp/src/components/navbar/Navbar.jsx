import React, { useState, useEffect } from 'react'
import Notification from '../../img/notification.png'
import Messages from '../../img/message.png'
import Settings from '../../img/settings.png'

const Navbar = ({socket}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])

 
  useEffect(() => {
    socket.on("getNotification", (data) => {
      // Add only unique notifications to the state using Set
      setNotifications((prev) => {
        const uniqueNotifications = new Set([...prev, data]);
        return Array.from(uniqueNotifications);
      });
    });
  }, [socket]);

  const showNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <h1 className='text-show text-base py-2 text-indigo-800'>{`${senderName} ${action} your post`}</h1>
    );
  };

  const handleClick = () =>{
    setNotifications([])
    setIsOpen(false)
  }

  return (
    <div className='bg-lime-700 w-96 flex justify-between mt-4 h-16 items-center px-5 text-lg rounded-md relative'>
      <div className="logoname text-white">
        Notification App
      </div>

    <div className="mainIconsContainer flex">
      <div className="icons flex cursor-pointer pr-3" onClick={() => setIsOpen(!isOpen)}>
        <img src={Notification} alt="error-icons" className='h-5 absolute'/>
        {
          notifications.length>0 && (
            <div className="notificationCounter relative bottom-3 left-3 bg-red-600 w-5 text-white h-5 text-sm rounded-full text-center">{notifications.length}</div>
          )
        }
      </div>

      <div className="icons flex mx-4 cursor-pointer pr-2" onClick={() => setIsOpen(!isOpen)}>
        <img src={Messages} alt="error-icons" className='h-5 absolute'/>

      </div>

      <div className="icons flex cursor-pointer px-2" onClick={() => setIsOpen(!isOpen)}>
        <img src={Settings} alt="error-icons" className='h-5 absolute'/>
      </div>
      </div>

{isOpen  && (
  <div className="showNotification flex flex-col justify-center items-center  bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-lg px-2 rounded-md absolute right-0 top-16 w-fit">
        {notifications.map((n)=>(
          showNotification(n)))}

          <button className='text-base bg-white shadow-lg px-2 mb-3 h-9 rounded-md' onClick={handleClick}>Mark All as Read</button>
      </div>
          )}

    </div>
  )
}

export default Navbar
