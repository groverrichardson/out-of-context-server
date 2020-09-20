const express = require('express');
const PlayersService = require('./players_service');
const jsonParser = express.json();

const playersRouter = express.Router();

playersRouter
    .route('/players')
    .get((req, res, next) => {
        const { game_id } = req.query;
        PlayersService.getAllPlayersFromGame(req.app.get('db'), game_id).then(
            (players) => {
                res.json(players);
            }
        );
    })
    .post(jsonParser, (req, res, next) => {
        const {
            player_name,
            points,
            player_status,
            game_id,
            answer_submitted,
        } = req.query;

        let newAnswerSubmit = false;

        if (answer_submitted !== 'false') {
            newAnswerSubmit = true;
        }

        const newPlayer = {
            player_name,
            points,
            player_status,
            game_id,
            answer_submitted: newAnswerSubmit,
        };
        const requiredInputs = {
            player_name,
            points,
            player_status,
            answer_submitted,
        };

        for (const [key, value] of Object.entries(requiredInputs)) {
            if (value == null || value == '') {
                return res.status(400).json({
                    error: { message: `Missing ${key}` },
                });
            }
        }

        if (player_status !== 'Judge' && player_status !== 'Player') {
            return res.status(400).json({
                error: {
                    message: `Player status must be either Judge or Player. Received: ${player_status}`,
                },
            });
        } else {
            PlayersService.addPlayer(req.app.get('db'), newPlayer).then(
                (response) => {
                    res.status(201).json(response);
                }
            );
        }
    });

playersRouter
    .route('/players/:playerId')
    .get((req, res, next) => {
        PlayersService.getPlayerById(
            req.app.get('db'),
            req.params.playerId
        ).then((player) => {
            res.json(player);
        });
    })
    .post(jsonParser, (req, res, next) => {
        const {
            player_name,
            points,
            player_status,
            game_id,
            answer_submitted,
        } = req.query;
        const playerUpdates = {
            player_name,
            points,
            player_status,
            game_id,
            answer_submitted,
        };

        PlayersService.updatePlayer(
            req.app.get('db'),
            req.params.playerId,
            playerUpdates
        ).then(() => {
            res.status(201).json('Player updated');
        });
    });

module.exports = playersRouter;
