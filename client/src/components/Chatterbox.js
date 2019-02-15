import React, { Component } from 'react';
import axios from "axios";
import io from "socket.io-client";
import TopNav from "./TopNav";
import Loading from "./Loading";
import Message, { Update } from "./Message";
import '../styles/chatterbox.css';
import getTimestamp from '../helpers';

class Chatterbox extends Component {
  state = {
    user: {
      _id: null,
      firstName: null,
      lastName: null,
      username: null,
      email: null,
      dateCreated: null
    },
    chatHistory: [],
    userIsTyping: null,
    onlineUsers: []
  }

  async componentDidMount() {
    this.socket = io();
    const res = await axios.get('/api/user');
    // leave console log in case there are issues in prod
    console.log(res);

    if (res.data.username) {
      this.setState({ user: res.data });
    }

    // Config for notifying users when a new user logs in
    this.socket.emit("login", this.state.user.username, this.socket.id);
    this.socket.on("login", (username) => {
      const chatHistory = [...this.state.chatHistory];
      const timestamp  = getTimestamp();
      chatHistory.push({
        user: { _id: "admin", username: "admin" },
        msg: `<--- ${username} logged in at ${timestamp.time} --->`,
        timestamp
      });
      this.setState({ chatHistory });
    });

    // Config for notifying users when a user logs out
    this.socket.on("logout", (username) => {
      const chatHistory = [...this.state.chatHistory];
      const timestamp  = getTimestamp();
      chatHistory.push({
        user: { _id: "admin", username },
        msg: `<--- ${username} logged out at ${timestamp.time} --->`,
        timestamp
      });
      this.setState({ chatHistory });
    });

    // Updates "online users" bin
    this.socket.on("online", (onlineUsers) => {
      console.log(onlineUsers);
      this.setState({ onlineUsers });
    });

    // Listens for incoming messages and posts it to chat history
    this.socket.on("message", (user, msg, timestamp) => {
      const chatHistory = [...this.state.chatHistory];
      chatHistory.push({ user, msg, timestamp });
      this.setState({ chatHistory });
      this.setState({ userIsTyping: null });
    });

    // Listens for typing activity and broadcast `${user} is typing`
    this.socket.on("typing", (user, value) => {
      console.log(user, value);
      if(value) {
        const userIsTyping = `${user.username} is typing...`;
        this.setState({ userIsTyping });
      } else {
        this.setState({ userIsTyping: null });
      }
    });
  }

  componentDidUpdate() {
    // auto scroll to the bottom of the conversation bin when a new message is received or sent
    const conversationBin = document.querySelector(".chatterbox__conversation-bin");
    conversationBin.scrollTop = conversationBin.scrollHeight;
  }

  logout = async () => {
    this.socket.emit("disconnect", this.state.user.username, this.socket.id);

    const res = await axios.get("/api/logout");
    if(res.data) window.location.href = "/";
  }

  // If user hits "enter" key, form is submitted. If user hits enter with the "shift" key pressed, a new line is return
  handleKeyDown = (e) => {
    const form = e.currentTarget.parentNode;
    if(e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event("submit"));
    }
  }

  // Sends user info to server to broadcast` ${user} is typing`
  handleKeyUp = (e) => {
    const { user } = this.state;
    const { value } = e.currentTarget;
    this.socket.emit("typing", user, value);
  }

  // Sends message to connected users
  handleSubmit = async (e) => {
    e.preventDefault();
    const { value } = this.form.message;
    const { user } = this.state;
    const timestamp = getTimestamp();

    if(value.trim().length) {
      this.socket.emit('message', user, value, timestamp);
      this.form.message.value = '';
    }
  }

  render() {
    const {
      user,
      chatHistory,
      userIsTyping,
      onlineUsers
    } = this.state;

    const showOnlineUsers = onlineUsers
      .filter(onlineUser => onlineUser !== user.username)
      .map((user, i) => <li key={i}>{user}</li>);

    const renderConversation = chatHistory.map((chat, i) => {
      const classStatus = chat.user._id === user._id
      ? "chatterbox__message chatterbox__message-sent"
      : chat.user._id === "admin"
      ? "chatterbox__group-update"
      : "chatterbox__message chatterbox__message-received";

      return (
        classStatus.includes("chatterbox__message")
        ? <Message
          key={i}
          chat={chat}
          classStatus={classStatus}
          />
        : <Update
          key={i}
          chat={chat}
          classStatus={classStatus}
          />
      );
    });

    return (
      <div className="chatterbox">
        {user.username
        ? <>
            <header>
              <TopNav
                user={user}
                logout={this.logout}
                />
            </header>
            <main>
              <div
              className="chatterbox__inventory"
              >
                <ul className="chatterbox__online-users">
                  <li>Online users</li>
                  {showOnlineUsers.length
                  ? showOnlineUsers
                  : <li id="no-users-online">
                      <span>
                        No other users are online! Feel free to <span role="img" aria-label="monkey emoji">🐒</span> around, no one's watching! <span role="img" aria-label="winky face emoji">😉</span>
                      </span>
                    </li>
                  }
                </ul>
              </div>
              <div
              className="chatterbox__messaging-container"
              >
                <ul
                className="chatterbox__conversation-bin"
                ref={div => this.conversationBin = div}
                >
                  {renderConversation}
                  <li className="chatterbox__user-is-typing">
                    {userIsTyping}
                  </li>
                </ul>
                <form
                className="chatterbox__form"
                action="/message"
                method="POST"
                onSubmit={this.handleSubmit}
                ref={form => this.form = form}
                >
                  <textarea
                  name="message"
                  className="chatterbox__type-message"
                  placeholder="Type anything..."
                  onKeyDown={this.handleKeyDown}
                  onKeyUp={this.handleKeyUp}
                  />
                </form>
              </div>
            </main>
          </>
        : <Loading />
        }
      </div>
    )
  }
}

export default Chatterbox;
