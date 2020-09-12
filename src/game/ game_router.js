const express = require('express');
const GameService = require('./game_service');
const GamesService = require('./game_service');

const gameRouter = express.Router();
const jsonParser = express.json();

process.on('unhandledRejection', function (err) {
    console.log(err);
});

gameRouter
    .route('/game')
    .get((req, res, next) => {
        GameService.getGameById(req.app.get('db'), req.query.id).then(
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
            cards_played,
            game_name,
            current_judge,
        } = req.query;

        const gameStats = {
            game_status,
            number_of_players,
            player_ids,
            cards_played,
            game_name,
            current_judge,
        };

        const requiredInputs = {
            game_status,
            number_of_players,
            game_name,
            cards_played,
        };

        if (game_status != ('Active' || 'Not Active')) {
            return res.status(400).json({
                error: { message: 'Game status must be Active or Not Active' },
            });
        }

        for (const [key, value] of Object.entries(requiredInputs)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing ${key}` },
                });
            }
        }

        gameStats.cards_played = gameStats.cards_played.split();

        GameService.addGame(req.app.get('db'), gameStats).then((response) => {
            res.status(201).json(response);
        });
    });

gameRouter
    .route('/game/:uuid')
    .post((req, res, next) => {
        const {
            active_card,
            game_status,
            round,
            number_of_players,
            player_ids,
            cards_played,
            current_judge,
        } = req.query;

        const gameStats = {
            game_status,
            number_of_players,
            round,
            active_card,
        };

        if (cards_played && !player_ids) {
            GameService.updateGame(
                req.app.get('db'),
                req.params.uuid,
                gameStats
            );

            const newCards = cards_played.split(',');

            console.log(newCards);

            newCards.forEach((cardId) => {
                GamesService.insertCardId(
                    req.app.get('db'),
                    req.params.uuid,
                    cardId
                ).then(() => {
                    res.status(201).json('Game updated');
                });
            });
        } else if (!cards_played && player_ids) {
            GameService.updateGame(
                req.app.get('db'),
                req.params.uuid,
                gameStats
            );

            const newPlayers = player_ids.split(',');

            newPlayers.forEach((playerId) => {
                GamesService.insertPlayerId(
                    req.app.get('db'),
                    req.params.uuid,
                    playerId
                ).then(() => {
                    res.status(201).json('Game updated');
                });
            });
        } else if (cards_played && player_ids) {
            GameService.updateGame(
                req.app.get('db'),
                req.params.uuid,
                gameStats
            );

            const newPlayers = player_ids.split(',');

            newPlayers.forEach((playerId) => {
                GamesService.insertPlayerId(
                    req.app.get('db'),
                    req.params.uuid,
                    playerId
                );
            });

            newCards.forEach((cardId) => {
                GamesService.insertCardId(
                    req.app.get('db'),
                    req.params.uuid,
                    cardId
                ).then(() => {
                    res.status(201).json('Game updated');
                });
            });
        } else {
            GameService.updateGame(
                req.app.get('db'),
                req.params.uuid,
                gameStats
            ).then(() => {
                res.status(201).json('Game updated');
            });
        }
    })

    .delete((req, res, next) => {
        const columnObject = {};
        const columns = req.query.columns.split(',').map((column) => {
            const columnName = column;
            columnObject[columnName] = null;
        });

        GameService.clearUsers(
            req.app.get('db'),
            req.params.uuid,
            columnObject
        ).then(() => {
            res.status(201).json('Cleared');
        });
    });

gameRouter.route('/create-game').post((req, res, next) => {
    const { game_status, game_name, player_name } = req.query;

    function randomNumber(max) {
        return Math.floor(Math.random() * Math.floor(max) + 1);
    }

    const active_card = randomNumber(3);

    const gameStats = {
        game_status,
        game_name,
        active_card,
    };

    const gameUpdates = { current_judge: 1 };

    const playerStats = { player_name };

    if (game_status != ('Active' || 'Not Active')) {
        return res.status(400).json({
            error: { message: 'Game status must be Active or Not Active' },
        });
    }

    for (const [key, value] of Object.entries(gameStats)) {
        if (value == null) {
            return res.status(400).json({
                error: { message: `Missing ${key}` },
            });
        }
    }

    Promise.all([
        GameService.addGame(req.app.get('db'), gameStats).then((id) => {
            playerStats.points = 0;
            playerStats.player_status = 'Judge';
            playerStats.game_id = parseInt(id);
        }),
    ])
        .then(() =>
            GameService.addPlayer(req.app.get('db'), playerStats).then(
                (playerId) => {
                    playerStats.player_id = parseInt(playerId);
                    GameService.updateGame(
                        req.app.get('db'),
                        playerStats.game_id,
                        gameUpdates
                    ).then((res) => {
                        return res.json(response);
                    });
                    return playerStats;
                }
            )
        )
        .then((response) => {
            res.status(201).json(response);
        })
        .catch((e) => res.json(e));
});

gameRouter.route('/dashboard').get((req, res, next) => {
    const { game_id } = req.query;
    const gameDetails = {
        players: [],
        active_card: '',
        active_wild_card: '',
        round: null,
        responses: [],
    };

    Promise.all([
        GameService.getAllPlayers(req.app.get('db'), game_id).then((response) =>
            response.forEach((player) => gameDetails.players.push(player))
        ),
        GameService.getGameById(req.app.get('db'), game_id)
            .then((response) => {
                gameDetails.active_card = response[0].active_card;
                if (response[0].active_wild_card !== null) {
                    gameDetails.active_wild_card = response[0].active_wild_card;
                }
                gameDetails.round = response[0].round;
            })
            .then(() =>
                GameService.getResponses(
                    req.app.get('db'),
                    game_id,
                    gameDetails.round
                ).then((response) =>
                    response.forEach((answer) =>
                        gameDetails.responses.push(answer)
                    )
                )
            ),
    ]).then(() => res.status(201).json(gameDetails));
});
module.exports = gameRouter;
