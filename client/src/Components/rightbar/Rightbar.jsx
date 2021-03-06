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


  useEffect( function () {
      console.log("from right bar " + currentUser._id);
      console.log(user);
      const fetchUser = async () => {
        const res = await axios.get(`/users/?username=${user}`);
        setAnotherUser(res.data);
        return res.data._id 
      };

      fetchUser().then((d) => {
        let f = async () => {
          let isFollowing = await currentUser.followings.includes(d);
          return isFollowing;
        };
        f().then((d) => {
          setFollowed(d);
        }).catch(console.error);
      });

    }, []);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + currentUser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);

  const handleClick = async () => {
    try {
      console.log(followed);
      if (followed) {
        console.log("already followed");
        await axios.put(`/users/${anotherUser._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: anotherUser._id });
      } else {
        await axios.put(`/users/${anotherUser._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: anotherUser._id });
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
        <a href="https://www.mountaindew.com">
        <img className="rightbarAd" src="assets/dew.jpg" alt=""/> 
        </a>  
        <a href="https://www.mercedes-benz.co.in/passengercars/mercedes-benz-cars/models/e-class/saloon-w213-fl/explore/comfort-teaser.module.html?utm_source=GoS&utm_medium=cpc&utm_campaign=U.C.MBC-E-Class.T.&utm_content=DCP_OneWeb_AO_Product%3fcsref%3dmc-sem_cn-IND_WS_MBC_Product_Individual_A_Class_Limousino_Exact_AO_ci-Google_si-g_pi-kwd-10095950_cri-575666072150_ai-mercedes%20benz%20e%20class%26kpid%3dgo_cmp-15918875401_adg-133594041298_ad-575666072150_kwd-10095950_dev-c_ext-&gclid=Cj0KCQjwmPSSBhCNARIsAH3cYgb6uIiZznDfTfUF_uHNOFxA1ki9JFH0m8uAsm0fu5uOlY-W1nrnVc8aAvVcEALw_wcB">
        <img className="rightbarAd" src="assets/merecedes.jpg" alt="" />
        </a>
        <a href="https://nepatop.com.np/">
        <img className="rightbarAd" src="assets/nepatop.jpg" alt="" />
        </a>
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
    navigate("/messenger", {replace:true});
  }

  const ProfileRightBar = ({followed}) => {
    return (
      <>
      
        {anotherUser.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}

        {anotherUser.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={messageUser}>
            Message
          </button>
        )}
        {/* <h4 className="rightbarTitle">User information</h4>
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
        </div> */}
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
//  if (anotherUser?._id == currentUser?._id) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar followed={followed}/> : <HomeRightBar />}
      </div>
    </div> 
  );
 // }
}
