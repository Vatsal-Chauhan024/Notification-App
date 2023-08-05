import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Card from '../components/Card/Card'
import { posts } from '../dummy'
const { io } = require("socket.io-client");

const Login = () => {

    const[username,setUsername] = useState("")
    const[user,setUser] = useState("")
    const[socket, setSocket] = useState(null)

    useEffect(()=>{
      setSocket(io("http://localhost:5000"));
    },[])

    useEffect(()=>{
      socket?.emit('newUser', user)
    }, [socket, user])

    const handleChange = (e) =>{
        setUsername(e.target.value)
    }
    const handleClick = (e) =>{
        setUser(username)
    }


  return (
    <div>
        {user ? <>
        <Navbar socket = {socket}/>
        {posts.map((post)=>(
            <Card key={post.id} post = {post} user = {user} socket = {socket}/>
        ))}
        </>: <>
        <div className=" border-2 border-violet-400 rounded-sm p-3 flex flex-col">
        <input type="text" placeholder='Username' onChange={handleChange} value={username} className='outline-none border-2 border-gray-400 flex items-center h-12 w-56 px-2 rounded-sm'/>
        <button onClick={handleClick} className='px-2 mt-3 h-10 bg-indigo-500 rounded-md text-white hover:bg-indigo-600'>Login</button>
      </div>
        </>}
      
    </div>
  )
}

export default Login
