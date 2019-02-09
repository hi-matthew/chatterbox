import React from "react";

const Message = (props) => {
  const { chat, classStatus } = props;
  return (
    <li className={classStatus}>
      <div className={"chatterbox__user-info"}>
        <p className={"chatterbox__username"}>
          {chat.user.username}
        </p>
        <p>{chat.timestamp.time}</p>
      </div>
      <span>
        {chat.msg}
      </span>
    </li>
  )
};

export const Update = (props) => {
  const { chat, classStatus } = props;
  return (
    <li className={classStatus}>{chat.msg}</li>
  )
}

export default Message;
