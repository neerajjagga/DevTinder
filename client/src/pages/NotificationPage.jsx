import { useEffect } from "react";
import { useConnectionStore } from './../store/connection.store';
import NotificationCard from "../components/NotificationCard";

const NotificationPage = () => {

    const { getReceivedConnections, receivedConnections, loading } = useConnectionStore();

    useEffect(() => {
        const fetchFeed = async () => {
            await getReceivedConnections();
        };
        fetchFeed();
    }, [getReceivedConnections]);

    return (
        <div className="w-full h-full mt-4">
            <div className="flex flex-col gap-2">
                <div className="text-center">
                    <span className="text-3xl font-bold">Notifications</span>
                </div>

                <div className="md:px-20 px-10">
                    <div className="flex flex-col items-center gap-5 mt-5">
                        {!loading ? (
                            receivedConnections.length > 0 ? (
                                receivedConnections.map(request => (
                                    <NotificationCard request={request} />
                                ))
                            ) : (
                                <div>No Notifications</div>
                            )
                        ) : (
                            <div>Loading Notifications...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationPage