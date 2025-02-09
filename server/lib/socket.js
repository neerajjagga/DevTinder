import { Server } from "socket.io";

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors : {
            origin : "http://localhost:5173",
        }
    });

    io.on("connection", (socket) => {
        console.log('A user connected');

        socket.on("sendMessage", ({ toUserId, fromUserId, message }) => {
            const roomId = [toUserId, fromUserId].sort().join('_');
            console.log("In send message");
            io.to(roomId).emit("newMessageReceived", { message, fromUserId });
        });
        
        socket.on("joinChat", ({ toUserId, fromUserId }) => {
            const roomId = [toUserId, fromUserId].sort().join('_');
            console.log(roomId);
            console.log("In join Chat");
            socket.join(roomId);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");            
        });
    })
}
