"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const roomHandler = (socket) => {
    const createRoom = () => {
        const roomId = (0, uuid_1.v4)();
        socket.join(roomId);
        socket.emit("room-created", { roomId });
        console.log("Room created with id", roomId);
    };
    const joinedRoom = ({ roomId, peerId }) => {
        console.log("new user has joined room", roomId, "with peer id as", peerId);
    };
    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};
exports.default = roomHandler;
