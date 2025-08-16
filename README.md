<h1 align="center">Socket Lovers</h1>
<h3 align="center">Message your friends (and enemies) in real time!</h3>
<p align="center">
    <img align="center" width="700px" src="./readme/gifs/realtime-messaging.gif" >
</p>

### Features

- Realtime messaging with sockets (messages saved on server)
- Private, Group, Public chats
- Create, rename, delete private & group chats
- Customize user profile picture and bio (saved to cloud storage)
- User signup / login
- Desktop and mobile design

## App Showcase

<p align="center">

| New conversation (gif)                                     |
| ---------------------------------------------------------- |
| <img width="400px" src="./readme/gifs/creating-chat.gif" > |

| Edit profile (gif)                                        |
| --------------------------------------------------------- |
| <img width="400px" src="./readme/gifs/edit-profile.gif" > |

| Loading animations (NEATO GIF!)                                 |
| --------------------------------------------------------------- |
| <img width="400px" src="./readme/gifs/loading-animations.gif" > |

</p>

| View profile                                                   | Rename conversation                                        | Delete conversation                                        |
| -------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| <img width="300px" src="./readme/images/chatter-profile.png" > | <img width="300px" src="./readme/images/rename-chat.png" > | <img width="300px" src="./readme/images/delete-chat.png" > |

| Message - Group chat                                         | Message - Private chat                                         | Refresh button animation (gif)                              |
| ------------------------------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------- |
| <img width="200px" src="./readme/images/message-group.png" > | <img width="200px" src="./readme/images/message-private.png" > | <img width="300px" src="./readme/gifs/refresh-button.gif" > |

| Error                                                | Login                                                | Signup                                                |
| ---------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| <img width="300px" src="./readme/images/error.png" > | <img width="300px" src="./readme/images/login.png" > | <img width="300px" src="./readme/images/signup.png" > |

### Server Stack

### Frontend Stack

### Endpoints & Socket Events

| Method | URI                   | Function               | Token | Body                                | Notes         |
| ------ | --------------------- | ---------------------- | ----- | ----------------------------------- | ------------- |
| POST   | /signup               | Create user            | N     | { username, password}               |               |
| POST   | /login                | Login user             | N     | { username, password}               |               |
| GET    | /current              | Retrieve current user  | Y     |                                     |               |
| GET    | /users                | Retrieve all users     | Y     |                                     |               |
| GET    | /users/:userId        | Retrieve user data     | Y     |                                     |               |
| PATCH  | /users/:userId        | Update bio             | Y     | { bio }                             |               |
| PATCH  | /users/:userId/avatar | Update profile picture | Y     | { avatar }                          |               |
| GET    | /chats-public         | Retrieve public chats  | Y     |                                     |               |
| GET    | /chats                | Retrieve chats         | Y     |                                     |               |
| POST   | /chats                | Create chat            | Y     | { name, userIds: ['id_1', 'id_2'] } |               |
| GET    | /chats/:chatId        | Retrieve chat          | Y     |                                     |               |
| PATCH  | /chats/:chatId        | Update chat name       | Y     | { name }                            | name optional |
| DELETE | /chats/:chatId        | Delete chat            | Y     |                                     |               |

| Socket Event      | Arguments      | Use                              |
| ----------------- | -------------- | -------------------------------- |
| 'connection'      | token          | socket connection                |
| 'send_message'    | token, message | sending messages                 |
| 'receive_message' | message        | notify client to update messages |
| 'join_room'       | token, chatId  | join chat                        |
| 'disconnecting'   |                | leave rooms before disconnect    |
| 'disconnect'      |                | log id has disconnected          |

### Learning Outcomes

- Interaction
    - Configuring API to require minimal data manipulation from client

- Backend
    - Utilizing Socket.io to implement real time chatting
    - Uploading profile pictures
        - Retrieve photo from form with multer
        - Resize, compress, and reformat the image to webp with sharp
        - Store on supabase with supabase storage
            - supabase: create project -> get url + key -> create bucket policy -> go nuts
    - chat signatures to enforce one chat for each unique group of users

- Frontend
    - Utilizing Socket.io-client to receive message updates
    - Extracting API logic away from components (My code is so clean now!)
    - vite default env variables!
    - first time using tailwind! I like it :)
    - Creating my own loading animations (more elaborate and fitting the UI)!

### Retrospective aka yapping

### Start commands

```bash
# Start backend server
cd server
npm install
node --watch server.js
```

```bash
# Start frontend react
cd client
npm install
npm run dev

# OR
cd client
npm install
npm run build
npm run preview
```

### Environment variables

```bash
# ./backend/.env
PORT
SERVER_URI
CLIENT_URI
DATABASE_URL
TOKEN_SECRET
SOCKET_ADMIN_USERNAME
SOCKET_ADMIN_PASSWORD
SUPABASE_URL
SUPABASE_KEY
SUPABASE_DEFAULT_CHAT_AVATAR
SUPABASE_DEFAULT_GROUP_CHAT_AVATAR

# ./client/.env
VITE_SERVER_URL
```

### Acknowledgements
