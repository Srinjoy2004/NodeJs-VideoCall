import SocketIoClient from "socket.io-client";
import { createContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";
import { useState } from "react";


const WS_Server = "http://localhost:5500";
export const SocketContext=createContext<any | null>(null);


const socket = SocketIoClient(WS_Server, {
    withCredentials: false,
    transports: ["polling", "websocket"]
});

interface Props {
    children: React.ReactNode
}




export const SocketProvider: React.FC<Props> = ({ children }) => {

    const navigate = useNavigate(); // will help to programatically handle navigation

    const [user, setUser] = useState<Peer>(); // new peer user
  



    useEffect(()=>{

        const userId = UUIDv4();
        const newPeer = new Peer(userId);
        setUser(newPeer);



        const enterRoom=({roomId}:{roomId:String})=>{
            navigate(`/room/${roomId}`); 
        }

        socket.on("room-created",enterRoom);
    },[]);




    return (
        <SocketContext.Provider value={{ socket , user}}>
            {children}
        </SocketContext.Provider>
    );
}










