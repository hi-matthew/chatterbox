# Chatterbox

Chatterbox is a MERN stack chat application that utilizes SocketIO for real-time, bidirectional, event-based communication.

<img src="./client/public/images/chatterbox.png" alt="Chatterbox application screenshot" style="box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5)" />

Within this project I was able to delve into numerous concepts surrounding REST API's, MongoDB, user sessions, user authentication, form validation, password hashing, cors and a few other things I'm sure I'm forgetting!

I decided to bootstrap the front-end with Create React App rather than using a traditional MVC design pattern because, frankly, I enjoy writing React. Though, I have worked with Pug previously to render view files.

## Install

Clone this respository:

```bash
git clone https://github.com/matthewoctober/chatterbox.git
```

(If you're not a fan of splitting terminal windows, feel free to _npm install <a href="https://www.npmjs.com/package/concurrently" target="_blank">concurrently</a>_ and write your own npm script to run both servers simultaneously. Otherwise, split your terminal windows and proceed.)

(Client terminal) Install client project dependencies:

```bash
cd chatterbox && cd client
npm install
```

(Server terminal) Install server project dependencies:

```bash
cd chatterbox && cd server
npm install
```

(Client terminal) Run development server:

```bash
npm start
```

(Server terminal) Run development express server:

```bash
npm start
```

Happy hacking!
