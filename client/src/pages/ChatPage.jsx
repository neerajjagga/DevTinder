import { useEffect, useState } from "react";
import { useConnectionStore } from "../store/connection.store";
import Chat from '../components/Chat';
import { PanelRight } from 'lucide-react';

const ChatPage = () => {
    const { getMyConnections, myConnections, loading, setSelectedUserForChat } = useConnectionStore();
    const [isSidebarActive, setIsSidebarActive] = useState(true);

    useEffect(() => {
        setSelectedUserForChat(null);
        getMyConnections();
    }, []);

    return (
        <div className="w-full h-screen flex">
            <section className={`fixed h-full bg-gray-800 transition-all ease-in ${isSidebarActive ? "w-56" : "max-w-16"}`}>
                <div className="h-full bg-gray-900 py-4">
                    {loading ? (
                        <p>Loading connections...</p>
                    ) : (
                        <>
                            <div className={`w-full p-2 ${isSidebarActive ? 'text-end ' : 'text-center'}`}>
                                <button className="hover:bg-gray-700 rounded-full transition ease-out p-2" onClick={() => setIsSidebarActive(prev => !prev)}>
                                    <PanelRight size={28} />
                                </button>
                            </div>
                            <div>
                                {myConnections.map(connection => (
                                    <div key={connection.id} onClick={() => setSelectedUserForChat(connection)} className="flex gap-2 items-center bg-gray-400 p-2 cursor-pointer border-b-2 border-gray-600">
                                        <div className='shrink-0'>
                                            <img className="h-12 rounded-full" src={connection.profileImageUrl ? connection.profileImageUrl : 'https://res.cloudinary.com/dabywmj68/image/upload/v1738950098/0684456b-aa2b-4631-86f7-93ceaf33303c_gckgiv.jpg'} alt="" />
                                        </div>
                                        {isSidebarActive && (
                                            <span className="text-lg line-clamp-1">{connection.name}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section className={`transition-all z-20 ease-in ${isSidebarActive ? "ml-56" : "ml-16"} w-full`}>
                <Chat />
            </section>
        </div>
    );
};

export default ChatPage;
