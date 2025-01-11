import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { setUser } from '../store/user.slice';
import { toast } from "react-toastify";
import { useState } from "react";

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(store => store.user.user);
    const dispatch = useDispatch();

    function handleImageUpload(e) {
        setLoading(true);
        e.preventDefault();

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post('/upload/img', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(({ data }) => {
                toast.success(data.message);
                dispatch(setUser(data.user));
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className="flex flex-col gap-4 items-center mt-8 bg-gray-600 py-5">
            <div className="relative">
                <label className='absolute bottom-0 right-0 rounded-2xl text-2xl text-red-600 font-semibold cursor-pointer'>
                    <input type="file" className='hidden' onChange={handleImageUpload} />
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="bg-white rounded-2xl size-10 text-red-500 py-1 px-1">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                    </div>
                </label>
                <img className="h-40 rounded-full" src={user?.photoUrl} alt="" />
                {loading && (
                    <span className="absolute top-20 left-16 loading loading-spinner text-success"></span>
                )}
            </div>
            <div className="flex gap-2">
                <span className="text-3xl font-bold">{user?.firstName}</span>
                {user?.lastName && (
                    <span className="text-3xl">{user.lastName}</span>
                )}
            </div>
            <div className="flex gap-2">
                {user?.skills.map((skill, index) => {
                    return <button key={index} className="bg-gray-100 text-black font-semibold p-1 px-2 rounded-xl text-sm">{skill}</button>
                })}
            </div>
        </div>
    )
}

export default ProfilePage