const express = require("express");
const GameService = require("./game_service");

const gameRouter = express.Router();
const jsonParser = express.json();

gameRouter
    .route("/game")
    .get((req, res, next) => {
        GameService.getGameById(req.app.get("db"), req.query.id).then(
            (game) => {
                res.json(game);
            }
        );
    })
    .post(jsonParser, (req, res, next) => {
        const {
            game_status,
            number_of_players,
            player_ids,
            active_card,
            active_wild_card,
        } = req.body;
        const newGame = {
            game_status,
            number_of_players,
            player_ids,
            active_card,
            active_wild_card,
        };
        GameService.addGame(req.app.get("db"), newGame).then(() => {
            res.status(201).json("Game added.");
        });
    });

gameRouter
    .route("/game/:gameId")
    .post((req, res, next) => {
        const {
            game_status,
            number_of_players,
            player_ids,
            active_card,
            active_wild_card,
        } = req.query;

        const gameUpdates = {
            game_status,
            number_of_players,
            player_ids,
            active_card,
            active_wild_card,
        };

        GameService.updateGame(
            req.app.get("db"),
            req.params.gameId,
            gameUpdates
        ).then(() => {
            res.status(201).json("Game updated.");
        });
    })
    .delete((req, res, next) => {
        const toBeCleared = req.params.number_of_players;
        GameService.clearUsers(
            req.app.get("db", req.params.gameId, toBeCleared)
        ).then(() => {
            res.status(201).json("Cleared");
        });
    });

module.exports = gameRouter;
