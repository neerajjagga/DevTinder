import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addRequests } from '../store/request.slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { removeRequest } from '../store/request.slice';

const NotificationPage = () => {
    const [loading, setLoading] = useState(false);
    const requests = useSelector(store => store.requests.requests);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        axios.get('/user/requests/received')
            .then(({ data }) => {
                dispatch(addRequests(data.requests));
            })
            .catch(({ response }) => {
                console.log(response.data.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    if (loading) {
        return <div>Loading....</div>
    }

    function handleReviewReq(status, reqId) {
        axios.post(`/request/review/${status}/${reqId}`)
            .then(({ data }) => {
                toast.success(status === 'accept' ? "Request Accepted successfully" : "Request rejected successfully");
                dispatch(removeRequest(reqId))
            })
    }

    function handleMarkAsReadBtn(reqId) {
        axios.patch(`/request/read/${reqId}`)
        .then(({ data }) => {
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='flex flex-col gap-4 mt-5 py-5 px-2 lg:px-20'>
            {requests?.length > 0 && (
                requests.map((req, index) => {
                    return <div key={index} className={`flex gap-5 py-2 px-2 rounded-sm ${req.isRead === true ? null : 'bg-gray-800' }`}>
                        <div>
                            <img className='h-24 rounded-full object-cover shadow-2xl' src={req.fromUserId.photoUrl} alt="" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-1 text-xl font-medium'>
                                <span>
                                    {req.fromUserId.firstName}
                                </span>
                                {req.fromUserId.lastName && <span>{req.fromUserId.lastName}</span>}
                            </div>
                            <span className='text-gray-400'>
                                {req.fromUserId.about}
                            </span>
                            <div className='flex gap-5 mt-2'>
                                <button
                                    onClick={() => handleReviewReq('accepted', req._id)}
                                    className='bg-green-600 text-white font-medium py-2 px-4 rounded-sm bg-opacity-80'>Accept</button>

                                <button
                                    onClick={() => handleReviewReq('rejected', req._id)}
                                    className='bg-red-600 text-white font-medium py-2 px-4 rounded-sm bg-opacity-80'>Reject</button>
                                <div>
                                    <button
                                    onClick={() => handleMarkAsReadBtn(req._id)}  
                                    className='bg-blue-600 text-white font-medium py-2 px-4 rounded-sm bg-opacity-80'>Mark as read</button>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            )}
        </div>
    )
}

export default NotificationPage