import "./message.css";
function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src="/assets/no_pp.jpg" alt="" />
        <p className="messageText">lorem50 </p>
      </div>
      <div className="messageBottom"> 1 hour ago</div>
    </div>
  );
}

export default Message;
