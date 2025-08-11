<h1 align="center">Socket Lovers</h1>
<h3 align="center"></h3>
<p align="center">
    <img align="center" width="500px" src="" >
</p>

### Description

### Features

- users
    - username, bio, avatar
    - edit bio, edit avatar

- chats
    - create, rename, delete
    - send messages (realtime messaging with socket)

### App Showcase

|                             |
| --------------------------- |
| <img width="400px" src="" > |

### Server Stack

### Frontend Stack

### Endpoints

| Method | URI                   | Function               | Token | Body                                | Notes         |
| ------ | --------------------- | ---------------------- | ----- | ----------------------------------- | ------------- |
| POST   | /signup               | Create user            | N     | { username, password}               |               |
| POST   | /login                | Login user             | N     | { username, password}               |               |
| GET    | /current              | Retrieve current user  | Y     |                                     |               |
| GET    | /users                | Retrieve all users     | Y     |                                     |               |
| GET    | /users/:userId        | Retrieve user data     | Y     |                                     |               |
| PATCH  | /users/:userId        | Update bio             | Y     | { bio }                             |               |
| PATCH  | /users/:userId/avatar | Update profile picture | Y     | { avatar }                          |               |
| GET    | /chats                | Retrieve chats         | Y     |                                     |               |
| POST   | /chats                | Create chat            | Y     | { name, userIds: ['id_1', 'id_2'] } |               |
| GET    | /chats/:chatId        | Retrieve chat          | Y     |                                     |               |
| PATCH  | /chats/:chatId        | Update chat name       | Y     | { name}                             | name optional |

| Socket Event    | Arguments      | Use                           |
| --------------- | -------------- | ----------------------------- |
| 'connection'    | token          | socket connection             |
| 'send_message'  | token, message | sending messages              |
| 'join_room'     | token, chatId  | join chat                     |
| 'disconnecting' |                | leave rooms before disconnect |
| 'disconnect'    |                | log id has disconnected       |

### Learning Outcomes

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

### Acknowledgements

### TODO

- server

- client

- more features
    - refresh button(?)
    - display avatar on message

- todo
    - bug: chats scroll x + scroll y
    - bug: rename chat -> refetch chat?
    - disable send message on loading

#### Data

users:

- usagii: "ffb6b765-e140-489e-b694-a8b40b978145"
- hachiware: "bdcbf276-85d3-4970-959c-591d2c575fad"
