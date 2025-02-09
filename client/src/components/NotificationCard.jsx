import { Check, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns";
import { useConnectionStore } from "../store/connection.store";

const NotificationCard = ({ request }) => {

    const { reviewConnection, loading } = useConnectionStore();

    const handleAccepted = () => {
        reviewConnection(request.id, "accepted");
    }

    const handleRejected = () => {
        reviewConnection(request.id, "rejected");
    }

    return (
        <div className="w-full sm:w-[80%] md:[60%] bg-gradient-to-b from-slate-900 to-slate-800 p-2 rounded-2xl flex gap-2">
            <div className="shrink-0">
                <img className="h-14 rounded-full" src={request.fromUserId.profileImageUrl ? request.fromUserId.profileImageUrl : 'https://res.cloudinary.com/dabywmj68/image/upload/v1738950098/0684456b-aa2b-4631-86f7-93ceaf33303c_gckgiv.jpg'} alt="" />
            </div>

            <div className="flex justify-between w-full">
                <div className="flex flex-col">
                    <span className="font-semibold text-xl">{request.fromUserId.name}</span>
                    {request.fromUserId.about && (
                        <span className="text-sm text-gray-200 line-clamp-1 md:line-clamp-2">{request.fromUserId.about}</span>
                    )}
                    <span className="text-gray-100 font-serif text-sm mt-2">{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</span>
                </div>
                <div className="flex ml-auto gap-2 items-center">
                    <button disabled={loading} onClick={handleAccepted} className="p-2 rounded-full bg-green-600 h-10 w-10">
                        <Check size={23} />
                    </button>
                    <button disabled={loading} onClick={handleRejected} className="p-2 rounded-full bg-red-600 h-10 w-10">
                        <X size={23} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotificationCard