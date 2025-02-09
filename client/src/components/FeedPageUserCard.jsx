import { useConnectionStore } from './../store/connection.store';

const FeedPageUserCard = ({ currentUser, currentActiveCardIndex, setCurrentActiveCardIndex }) => {
    const { sendConnection, reviewConnection } = useConnectionStore();

    const handleInterested = async () => {
        const isInterestedSuccessfully = await sendConnection(currentUser.id, "interested");
        if (isInterestedSuccessfully) {
            setCurrentActiveCardIndex(currentActiveCardIndex + 1);
        }
    }

    const handleIgnore = async () => {
        const isIgnoredSuccessfully = await sendConnection(currentUser.id, "ignore");
        if (isIgnoredSuccessfully) {
            setCurrentActiveCardIndex(currentActiveCardIndex + 1);
        }
    }

    return (
        <div className="flex flex-col bg-gradient-to-t from-slate-900 to-slate-700 md:w-[50%] lg:w-[28%] sm:w-[50%] w-[70%] rounded-2xl overflow-hidden">
            <div>
                <img className="w-full h-auto" src={currentUser.profileImageUrl ? currentUser.profileImageUrl : "https://res.cloudinary.com/dabywmj68/image/upload/v1738950098/0684456b-aa2b-4631-86f7-93ceaf33303c_gckgiv.jpg"} alt={`Profile Image of ${currentUser.name}`} />
            </div>
            <div className="flex flex-col gap-1 px-2 pt-2">
                <span className="text-3xl font-bold">{currentUser.name}</span>
                {currentUser.about && (
                    <span className="md:line-clamp-3 line-clamp-2 text-gray-300">{currentUser.about}</span>
                )}
            </div>
            <div className="px-2 pb-2">
                {currentUser?.skills.length > 0 && currentUser.skills.map((skill, index) => (
                    <div key={index} className="bg-slate-800 text-gray-300 px-2 py-1 rounded-md inline-block mr-2 mt-1">
                        {skill}
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-3 gap-4 font-semibold">
                <button onClick={handleInterested} className="bg-blue-500 w-[50%] py-2 rounded-lg text-white">Interested</button>
                <button onClick={handleIgnore} className="w-[50%] bg-red-500 py-2 rounded-lg text-white">Ignore</button>
            </div>
        </div>
    )
}

export default FeedPageUserCard
