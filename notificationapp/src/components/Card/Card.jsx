
import React, { useState } from 'react'
import Heart from '../../img/heart.png'
import Comment from '../../img/comment.png'
import Info from '../../img/info.png'
import Share from '../../img/share.png'
import HeartFilled from '../../img/heartFilled.png'

const Card = ({ post, user, socket }) => {

  const [liked, setLiked] = useState(false)
  const handleIconColor = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className='w-96 mb-7'>
      <div className="info flex pt-5 pb-1 items-center">
        <img src={post.userImg} alt="error-avatar" className='userImg h-10 w-11 rounded-full object-cover' />
        <span className="fullName ml-3">{post.username}</span>
      </div>
      <img src={post.postImg} alt="error-post" className='postImg rounded-lg' />
      <div className="interaction flex relative pt-2">
        {liked ? (<img src={HeartFilled} alt="error-heart" className="cardIcon cursor-pointer h-5" />) : (
          <img src={Heart} alt="error-heart" className="cardIcon cursor-pointer h-5" onClick={() => handleIconColor(1)} />
        )}
        <img src={Comment} alt="error-comment" className="cardIcon mx-5 cursor-pointer " onClick={() => handleIconColor(2)} />
        <img src={Share} alt="error-share" className="cardIcon cursor-pointer h-5" onClick={() => handleIconColor(3)} />
        <img src={Info} alt="error-info" className="cardIcon absolute right-1 h-4 cursor-pointer" />
      </div>
    </div>
  )
}

export default Card
