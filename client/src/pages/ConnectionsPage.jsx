import { useEffect } from "react"
import { useConnectionStore } from "../store/connection.store";
import MyConnectionCard from "../components/MyConnectionCard";
import { Link } from 'react-router-dom';

const ConnectionsPage = () => {

    const { getMyConnections, myConnections, loading } = useConnectionStore();

    useEffect(() => {
        getMyConnections();
    }, [getMyConnections]);

    return (
        <div className="w-full h-full mt-4">
            <div className="flex flex-col gap-2">
                <div className="text-center">
                    <span className="text-3xl font-bold">My <span className="text-blue-500">Connections</span></span>
                </div>

                <div className="md:px-20 px-10">
                    <div className="flex flex-col items-center gap-5 mt-5">
                        {!loading ? (
                            myConnections.length > 0 ? (
                                myConnections.map(connection => (
                                    <MyConnectionCard connection={connection} />
                                ))
                            ) : (
                                <div>No Connections, <Link to={'/'} className="text-blue-500 underline">Explore now</Link></div>
                            )
                        ) : (
                            <div>Loading your Connections...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectionsPage