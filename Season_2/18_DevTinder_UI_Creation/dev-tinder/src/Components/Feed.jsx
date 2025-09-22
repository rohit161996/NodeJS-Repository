import axios from "axios";
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from '../utils/feedSlice';
import UserCard from "./UserCard";

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(
        BASE_URL + "/feed",
        { withCredentials: true }
      );
      console.log("getFeed", res);
      dispatch(addFeed(res?.data));
    }
    catch (err) {
      console.log("ERROR", err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && feed.length > 0 ? (
      feed.map((user) => (
        <div className="flex justify-center my-10">
          <UserCard user={user} />
        </div>
      ))
    ) : (
      <h1 className="flex justify-center text-2xl my-10 text-gray-500">
        No profiles available in feed
      </h1>
    )
  );
}

export default Feed
