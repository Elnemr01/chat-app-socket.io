import React from 'react'
import assets from '../../assets/assets'

const Sidebar = ({selectedChat, setSelectedChat}) => {
    return (
        <div>
            <div className="logo m-4 flex items-center">
                <img src={assets.logo} alt="Logo" loading='lazy' className='h-10'/>
            </div>
            <div className="search">
                <input type="text" placeholder='Search or start new chat'
                className='p-2 bg-transparent backdrop-blur-lg rounded-full text-white w-[70%] mx-auto outline-none inline-block'/>
            </div>
        </div>
    )
}

export default Sidebar