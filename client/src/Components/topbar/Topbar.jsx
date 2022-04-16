import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">𝒱𝒶𝓁𝒶𝓃𝓉𝓎</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon />
          <input placeholder="Search" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={linkStyle}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link to={"/profile/" + user.username} style={linkStyle}>
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <PersonIcon />
          <span className="topbarIconBadge">1</span>
        </div>
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <ChatIcon />
          <span className="topbarIconBadge">1</span>
        </div>
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <NotificationsIcon />
          <span className="topbarIconBadge">1</span>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture ? PF + user.profilePicture : PF + "no_pp.jpg"
            }
            alt="Picture"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
