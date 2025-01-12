import {useEffect, useState} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedItems } from '../store/feed.slice';
import FeedUserCard from '../components/FeedUserCard';

const FeedPage = () => {
  const [loading, setLoading] = useState(false);
  const feedItems = useSelector(store => store.feed.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios.get('/feed')
      .then(({data}) => {
        dispatch(addFeedItems(data.users))
      })
      .catch(({response}) => {
        console.log(response.data.message);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex justify-center mt-8'>
      {feedItems?.length > 0 ? (
        <FeedUserCard user={feedItems[0]} />
      ) : (
        <div>No users found</div>
      )}
    </div>
  )
}

export default FeedPage