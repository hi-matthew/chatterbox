import React from "react";

const TopNav = (props) => {
  const { user, logout } = props;
  return (
    <ul className="top-nav">
      <li>
        <h2 style={{ margin: "0" }}>
          {`# ${user.username}`}
        </h2>
      </li>
      <li
      className="top-nav__menu"
      onClick={logout}
      >
        Logout
      </li>
    </ul>
)};

export default TopNav;