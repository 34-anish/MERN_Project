import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Rightbar({ user }) {
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        {/* Ad */}
        <img className="rightbarAd" src="assets/ad.jpg" alt="" />

        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
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
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={`${PF}/person/1.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Kalash Shrestha</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}/person/2.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Nischal Shakya</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}/person/3.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Avaya Bajracharya</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}/person/4.jpg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
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
