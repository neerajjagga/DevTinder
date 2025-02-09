
const MyConnectionCard = ({ connection }) => {
    return (
        <div className="w-full sm:w-[80%] md:[60%] bg-gradient-to-b from-slate-900 to-slate-800 p-2 rounded-2xl flex gap-2">
            <div className="shrink-0">
                <img className="h-14 rounded-full" src={connection.profileImageUrl ? connection.profileImageUrl : 'https://res.cloudinary.com/dabywmj68/image/upload/v1738950098/0684456b-aa2b-4631-86f7-93ceaf33303c_gckgiv.jpg'} alt="" />
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-xl">{connection.name}</span>
                {connection.about && (
                    <span className="text-sm text-gray-200 line-clamp-1 md:line-clamp-2">{connection.about}</span>
                )}
            </div>
            {/* TODO: add skills here */}
        </div >
    )
}

export default MyConnectionCard