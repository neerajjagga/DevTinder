import React from 'react'
import { removeItemFromFeed } from '../store/feed.slice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const FeedUserCard = ({ user }) => {

    const { _id, firstName, lastName, about, photoUrl, skills } = user;
    const dispatch = useDispatch();

    function handleStatus(e, status) {
        e.preventDefault();
        axios.post(`/request/send/${status}/${_id}`)
            .then(({data}) => {
                toast.success(data.message);
                dispatch(removeItemFromFeed())
            })
            .catch(({response}) => {
                toast.error(response.data.message);
            })
    }

    return (
        <div className='w-[350px] flex flex-col items-center gap-2 border-2 border-gray-700 rounded-xl mx-14 pb-5 px-3'>
            <div className=''>
                <img className='max-h-56 rounded-full shadow-2xl' src={photoUrl} alt={`${firstName} photo`} />
            </div>
            <div>
                <div className='flex gap-2 text-3xl font-semibold mt-3'>
                    <span>{firstName}</span>
                    {lastName && <span>{lastName}</span>}
                </div>
                <p className='text-sm'>{about}</p>
            </div>
            <div className='flex flex-wrap gap-2 mt-2'>
                {skills.slice(0, 6).map((skill, index) => {
                    return <button key={index} className='bg-gray-400 text-black py-1 px-2 font-semibold text-sm rounded-md'>{skill}</button>
                })}
            </div>
            <div className='flex gap-8 mt-8'>

                <button onClick={(e) => handleStatus(e, 'interested')} className="btn btn-outline btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </button>

                <button onClick={(e) => handleStatus(e, 'ignore')}  className="btn btn-outline btn-error">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

            </div>
        </div>
    )
}

export default FeedUserCard