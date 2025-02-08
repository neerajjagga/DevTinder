import React, { useEffect, useState } from 'react'
import { useUserStore } from '../store/user.store'
import { useFeedStore } from '../store/feed.store';
import FeedPageUserCard from '../components/FeedPageUserCard';

const FeedPage = () => {
  const { user } = useUserStore();
  const { feedUsers, getFeed, loading } = useFeedStore();
  const [filteredFeed, setFilteredFeed] = useState([]);
  const [currentActiveCardIndex, setCurrentActiveCardIndex] = useState(0);
  const currentActiveCardUser = filteredFeed[currentActiveCardIndex];

  useEffect(() => {
    const fetchFeed = async () => {
      console.log("Fetching feed...");
      await getFeed();
    };

    fetchFeed();
  }, [getFeed]);

  useEffect(() => {
    setFilteredFeed(feedUsers);
    console.log("Updated filtered feed:", filteredFeed);
  }, [feedUsers]);

  return (
    <>
      {!loading && filteredFeed.length === 0 ? (
        <div className='w-full h-full flex justify-center mt-10'>
          <span className='text-2xl font-bold'>No users found</span>
        </div>
      ) : (
        <div>
          <div className='w-full h-full flex justify-center mt-5'>
            {!loading ? (
              currentActiveCardUser ? (
                <FeedPageUserCard
                  key={user.id}
                  currentUser={currentActiveCardUser}
                  currentActiveCardIndex={currentActiveCardIndex}
                  setCurrentActiveCardIndex={setCurrentActiveCardIndex}
                />
              ) : (
                <div>
                  <span className='text-2xl font-bold'>No more users found</span>
                </div>
              )
            ) : (
              <div>Loading......</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default FeedPage