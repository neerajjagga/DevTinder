
const ProfileShimmer = () => {
    return (
        <div className="min-h-[350px] flex flex-col gap-4 items-center mt-8 bg-gray-800 py-5 px-10 mx-8 lg:w-1/2 rounded-lg">
            <div className="rounded-full min-h-[160px] min-w-[160px] bg-gray-500"></div>
            <div className="rounded-2xl min-h-[50px] min-w-[160px] bg-gray-500"></div>
            <div className="rounded-2xl min-h-[30px] min-w-[160px] bg-gray-500"></div>
            <div className="flex flex-wrap gap-2">
                {Array(10).fill(null).map((_, index) => {
                    return <div key={index} className="rounded-2xl min-h-[32px] min-w-[140px] bg-gray-500"></div>
                })}
            </div>
        </div>
    )
}

export default ProfileShimmer