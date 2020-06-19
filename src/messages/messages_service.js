const MessagesService = {
    getAllMessages(db) {
        return db.select("*").from("messages");
    },
    addMessage(db, newMessage) {
        return db.insert(newMessage).into("messages");
    },
};

module.exports = MessagesService;
