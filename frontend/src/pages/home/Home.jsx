import React, { useState } from 'react'
import Sidebar from '../../appComponents/homeComponents/Sidebar'
import ChatContainer from '../../appComponents/homeComponents/ChatContainer'
import RightSidebar from '../../appComponents/homeComponents/RightSidebar'

const Home = () => {
    let [selectedChat, setSelectedChat] = useState(false)
    return (
        <div className='bg-[url("../../assets/bgImage.svg")] h-screen bg-cover flex items-center bg-blue-400'>
            <div className={`content w-[70%] m-auto text-white border border-white rounded-lg backdrop-blur-lg h-[80%]
                grid ${selectedChat ? " grid-cols-[1fr_1.5fr_1fr]" : " grid-cols-2"}`}>
                <Sidebar selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>
                <ChatContainer/>
                <RightSidebar/>
            </div>
        </div>
    )
}

export default Home