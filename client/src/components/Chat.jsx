import { useConnectionStore } from "../store/connection.store";
import { useState } from "react";

const Chat = () => {
    const { selectedUserForChat } = useConnectionStore();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const sendMessage = () => {

    };

    if (!selectedUserForChat) {
        return (
            <div className="h-screen flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-600">Select a user to chat</span>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="p-3 bg-gray-800 text-white flex items-center gap-3">
                <img
                    src={selectedUserForChat.profileImageUrl || 'https://res.cloudinary.com/dabywmj68/image/upload/v1738950098/0684456b-aa2b-4631-86f7-93ceaf33303c_gckgiv.jpg'}
                    alt={selectedUserForChat.name}
                    className="w-10 h-10 rounded-full"
                />
                <h2 className="text-lg">{selectedUserForChat.name}</h2>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                
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
