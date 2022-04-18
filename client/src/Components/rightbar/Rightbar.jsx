import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import ChatOnline from "../../Components/chatOnline/ChatOnline";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Rightbar({ user }) {
  let navigate = useNavigate();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [anotherUser, setAnotherUser] = useState({});
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // console.log(user);
  // console.log(currentUser);
  // console.log(currentUser.followings.includes(user._id));

  const [followed, setFollowed] = useState();

  useEffect(() => {
    console.log("from right bar " + currentUser._id);
    console.log(user);
    setFollowed(
      (async function checkFollow() {
        let isFollowing = await currentUser.followings.includes(user?._id);
        return isFollowing;
      })()
    );

    const fetchUser = async () => {
      const res = await axios.get(`/users/?username=${user}`);
      setAnotherUser(res.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
      console.log(followed);
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        console.log("already followed");
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        await axios.post(`/conversations/`, {
          senderId: currentUser._id,
          receiverId: user._id,
        });
        // console.log(user, currentUser);
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightBar = () => {
    return (
      <>
        <img className="rightbarAd" src="assets/new.jpg" alt="" />
        {/* <h4 className="rightbarTitle">Online Friends</h4> */}
        <ul className="rightbarFriendList"></ul>
      </>
    );
  };
  const messageUser = async () => {
    console.log("messaging now");
    console.log(currentUser._id);
    console.log(anotherUser._id);
    await axios.post(`/conversations/`, {
      senderId: currentUser._id,
      receiverId: anotherUser._id,
    });
    navigate("/messenger", { replace: true });
  };
  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {console.log(user)}
            {console.log(currentUser)}
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}

        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={messageUser}>
            Message
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city || "NA"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue"> {user.from || "NA"} </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">Followings:</h4>

        {friends.map((friend) => (
          <Link
            to={`/profile/${friend.username}`}
            style={{ textDecoration: "none" }}
          >
            <div className="rightbarFollowings">
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "no_pp.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
