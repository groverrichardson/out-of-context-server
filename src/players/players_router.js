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
        const { player_name, points, player_status } = req.body;
        const newPlayer = { player_name, points, player_status };

        PlayersService.addPlayer(req.app.get("db"), newPlayer).then(() => {
            res.status(201).json("Player added");
        });
    });

playersRouter.route("/player/:playerId").get((req, res, next) => {
    PlayersService.getplayerById(req.app.get("db"), req.params.playerId).then(
        (player) => {
            res.json(player);
        }
    );
});

module.exports = playersRouter;
