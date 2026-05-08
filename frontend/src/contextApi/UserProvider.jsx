import { createContext, useContext } from "react";
import io from "socket.io-client";
import { useState } from "react";

const userContext=createContext();

export const useAuth=()=> useContext(userContext);


const UserProvider = ({children}) => {

    let [user,setUser]=useState(()=> localStorage.getItem("chatAppUser") !== 'undefined' ? JSON.parse(localStorage.getItem("chatAppUser")) : null);
    let [chatAppUserToken,setToken]=useState(()=> localStorage.getItem("chatAppUserToken") !== 'undefined' ? JSON.parse(localStorage.getItem("chatAppUserToken")) : null);
    let [socket,setSocket]=useState(null);
    let [onlineUsers,setOnlineUsers]=useState([]);


    // get socket connection
    let socketConnection = (user)=> {
        if(!user) return;

        const newSocket = io(import.meta.env.VITE_APP_BACKEND_URL, {
            query: {
                userId: user._id,
            },
        });

        newSocket.connect();

        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (onlineUsers) => {
            setOnlineUsers(onlineUsers);
        });

    }







    const data={
        user,
        setUser,
        socket,
        setSocket,
        onlineUsers,
        setOnlineUsers,
        socketConnection,
    }

    return (
        <userContext.Provider value={data}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider














