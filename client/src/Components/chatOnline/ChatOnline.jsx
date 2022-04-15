import "./chatOnline.css";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src="/assets/no_pp.jpg" alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">ANish Manandhar</span>
      </div>
    </div>
  );
}
