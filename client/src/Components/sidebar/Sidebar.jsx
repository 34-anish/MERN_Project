import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <Link to ={`/profile/`}>
            <RssFeedIcon className="sidebarIcon" />
          </Link>
            <span className="sidebarListItemText">Feed</span>
          </li>
          
          <li className="sidebarListItem">
            <Link to ={`/profile/`}>
            <ChatIcon className="sidebarIcon" />
            </Link><span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
          <Link to ={`/profile/`}>
            <PlayCircleFilledIcon className="sidebarIcon" />
            </Link>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
          <Link to ={`/profile/`}>
            <GroupIcon className="sidebarIcon" />
            </Link>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
          <Link to ={`/profile/`}>
            <BookmarkIcon className="sidebarIcon" />
            </Link>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
          <Link to ={`/profile/`}>
            <EventIcon className="sidebarIcon" />
            </Link>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
          <Link to ={`/profile/`}>
            <SchoolIcon className="sidebarIcon" />
            </Link>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
