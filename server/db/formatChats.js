const setAvatar = (userId, chat) => {
    if (chat.users.length <= 1) {
        chat.avatar = chat.users[0].avatar;
    }
    if (chat.users.length == 2) {
        const otherUser = chat.users.find((user) => user.id != userId);
        chat.avatar = otherUser.avatar;
    }
    return chat;
};

const setChatName = (userId, chat) => {
    if (!chat.name || chat.name == '') {
        chat.name =
            chat.users.length == 1
                ? chat.users[0].username
                : chat.users
                      .filter((user) => user.id != userId)
                      .map((user) => user.username)
                      .join(', ');
    }
    return chat;
};

export { setAvatar, setChatName };
