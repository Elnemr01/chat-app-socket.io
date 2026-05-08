import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import {configDotenv} from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import messageRouter from './routers/messageRouter.js';



configDotenv();

const app=express();
const server=http.createServer(app);

export const io=new Server(server,{
    cors:{origin: '*'}
});

export let userSocketMap= {}; //userId : socketId

io.on("connection",(socket)=> {
    const userId= socket.handshake.query.userId;
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers",Object.keys(userSocketMap)); // emit online users to all clients

    io.on("disconnect",()=> {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap)); // emit online users to all clients
    })
})






app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

mongoose.connect(process.env.DATABASE_URL).then(()=> {
    console.log('connected to database')
})

// app.use("/",(req,res)=>{
//     res.send("server is live")
// })

app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);






server.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});