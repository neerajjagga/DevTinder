import { useConnectionStore } from "../store/connection.store";
import { useEffect, useState } from "react";
import { createSocketConnection } from "./../lib/socket";
import { useUserStore } from "./../store/user.store";

const Chat = () => {
    const { selectedUserForChat } = useConnectionStore();
    const { user } = useUserStore();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setMessages([]);
        if (selectedUserForChat) {
            const newSocket = createSocketConnection();
            newSocket.emit("joinChat", { toUserId: user.id, fromUserId: selectedUserForChat.id });

            newSocket.on("newMessageReceived", ({ message, fromUserId }) => {
                if (fromUserId !== user.id) {
                    setMessages((prevMessages) => [...prevMessages, { fromUserId, message }]);
                }
            });

            setSocket(newSocket);

            return () => {
                newSocket.off("newMessageReceived");
                newSocket.disconnect();
            };
        }
    }, [selectedUserForChat]);

    const sendMessage = () => {
        if (socket && message.trim() !== "") {
            socket.emit("sendMessage", {
                toUserId: selectedUserForChat.id,
                fromUserId: user.id,
                message
            });

            setMessages((prevMessages) => [...prevMessages, { fromUserId: user.id, message }]);
            setMessage("");
        }
    };

    if (!selectedUserForChat) {
        return (
            <div className="h-screen flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-600">Select a user to chat</span>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="p-3 bg-gray-800 text-white flex items-center gap-3">
                <img
                    src={selectedUserForChat.profileImageUrl || 'https://res.cloudinary.com/dabywmj68/image/upload/v1738950098/0684456b-aa2b-4631-86f7-93ceaf33303c_gckgiv.jpg'}
                    alt={selectedUserForChat.name}
                    className="w-10 h-10 rounded-full"
                />
                <h2 className="text-lg">{selectedUserForChat.name}</h2>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-100 flex flex-col gap-2">
                {messages.map((chat, index) => (
                    <div
                        key={index}
                        className={`px-4 py-2 rounded-lg max-w-xs ${chat.fromUserId === user.id ? "bg-blue-500 text-white self-end" : "bg-gray-300 self-start"}`}
                    >
                        {chat.message}
                    </div>
                ))}
            </div>

            <div className="p-3 bg-gray-200 flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:outline-none"
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
