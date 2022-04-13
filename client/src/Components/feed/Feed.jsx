import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      console.log(username);
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/6245a3131c3691804aad487b");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  // console.log(posts);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
