<h1 align="center">Socket Lovers</h1>
<h3 align="center"></h3>
<p align="center">
    <img align="center" width="500px" src="" >
</p>

### Description

### Features

### App Showcase

|                             |
| --------------------------- |
| <img width="400px" src="" > |

### Server Stack

### Frontend Stack

### Endpoints

| Method | URI     | Function           | Token | Body                                | Notes |
| ------ | ------- | ------------------ | ----- | ----------------------------------- | ----- |
| POST   | /signup | Create user        | N     | { username, password}               |       |
| POST   | /login  | Login user         | N     | { username, password}               |       |
| GET    | /users  | Retrieve all users | Y     |                                     |       |
| GET    | /chats  | Retrieve chats     | Y     |                                     |       |
| POST   | /chats  | Create chat        | Y     | { name, userIds: ['id_1', 'id_2'] } |       |

| Socket Event   | Arguments      | Use               |
| -------------- | -------------- | ----------------- |
| 'connection'   | token          | socket connection |
| 'send_message' | token, message | sending messages  |
| 'join_room'    | token, chatId  | join chat         |

### Learning Outcomes

-   Backend

    -   Utilizing Socket.io to implement real time chatting

-   Frontend
    -   Utilizing Socket.io-client to receive message updates
    -   vite default env variables!

### Retrospective aka yapping

### Start commands

### Acknowledgements

### TODO

-   server

    -   create chats

-   client

    -   extract client socket actions

-   LATER
    -   handle jwt errors properly on server
    -   refactor statusCode to status
    -   validate input
        -   login
        -   signup
        -   create chat

#### Data

const chat = await createChat('swagstersz', [
{id: "ffb6b765-e140-489e-b694-a8b40b978145"},
{id: "bdcbf276-85d3-4970-959c-591d2c575fad"},
]);
console.log(chat)
