import { useEffect } from "react";
import { useConnectionStore } from "../store/connection.store";
import Chat from '../components/Chat';

const ChatPage = () => {
    const { getMyConnections, myConnections, loading, setSelectedUserForChat } = useConnectionStore();

    useEffect(() => {
        setSelectedUserForChat(null);
        getMyConnections();
    }, []);

    return (
        <div className="w-full h-screen grid grid-cols-10">
            <section className="col-span-3">
                <div className="h-full bg-red-400 py-4">
                    {loading ? (
                        <p>Loading connections...</p>
                    ) : (
                        <div>
                            {myConnections.map(connection => (
                                <div key={connection.id} onClick={() => setSelectedUserForChat(connection)} className="flex gap-2 items-center bg-gray-400 p-2 cursor-pointer border-b-2 border-gray-600">
                                    <div className="shrink-0">
                                        <img className="h-12 rounded-full" src={connection.profileImageUrl ? connection.profileImageUrl : 'https://res.cloudinary.com/dabywmj68/image/upload/v1738950098/0684456b-aa2b-4631-86f7-93ceaf33303c_gckgiv.jpg'} alt="" />
                                    </div>
                                    <span className="text-lg line-clamp-1">{connection.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="col-span-7 h-full bg-green-400 w-full">
                <Chat />
            </section>
        </div>
    );
};

export default ChatPage;
