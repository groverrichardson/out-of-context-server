const express = require("express");
const PlayersService = require("./players_service");
const jsonParser = express.json();

const playersRouter = express.Router();

playersRouter
    .route("/players")
    .get((req, res, next) => {
        PlayersService.getAllPlayers(req.app.get("db")).then((players) => {
            res.json(players);
        });
    })
    .post(jsonParser, (req, res, next) => {
        const { player_name, points, player_status, game_id } = req.query;
        const newPlayer = { player_name, points, player_status, game_id };
        const requiredInputs = { player_name, points, player_status };

        for (const [key, value] of Object.entries(requiredInputs)) {
            if (value == null || value == "") {
                return res.status(400).json({
                    error: { message: `Missing ${key}` },
                });
            }
        }

        if (player_status != ("Judge" || "Player")) {
            return res.status(400).json({
                error: {
                    message: `Player status must be either Judge or Player.`,
                },
            });
        }

        PlayersService.addPlayer(req.app.get("db"), newPlayer).then(() => {
            res.status(201).json("Player added");
        });
    });

playersRouter
    .route("/players/:playerId")
    .get((req, res, next) => {
        PlayersService.getPlayerById(
            req.app.get("db"),
            req.params.playerId
        ).then((player) => {
            res.json(player);
        });
    })
    .post(jsonParser, (req, res, next) => {
        const { player_name, points, player_status, game_id } = req.query;
        const playerUpdates = { player_name, points, player_status, game_id };

        PlayersService.updatePlayer(
            req.app.get("db"),
            req.params.playerId,
            playerUpdates
        ).then(() => {
            res.status(201).json("Player updated");
        });
    });

module.exports = playersRouter;
