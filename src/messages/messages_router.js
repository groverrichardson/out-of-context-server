const express = require("express");
const MessagesService = require("./messages_service");

const messagesRouter = express.Router();
const jsonParser = express.json();

messagesRouter
    .route("/messages")
    .get((req, res, next) => {
        MessagesService.getAllMessages(req.app.get("db")).then((messages) => {
            res.json(messages);
        });
    })
    .post(jsonParser, (req, res, next) => {
        const { message_copy } = req.body;
        const newMessage = { message_copy };

        MessagesService.addMessage(req.app.get("db"), newMessage).then(
            (message) => {
                res.status(201).json("This works");
            }
        );
    });

module.exports = messagesRouter;
