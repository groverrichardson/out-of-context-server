const express = require('express');
const AnswersService = require('./answers_service');

const answersRouter = express.Router();
const jsonParser = express.json();

answersRouter
    .route('/answers')
    .get((req, res, next) => {
        const { round, game_id } = req.query;
        AnswersService.getAnswersForRound(
            req.app.get('db'),
            round,
            game_id
        ).then((answers) => res.json(answers));
    })
    .post(jsonParser, (req, res, next) => {
        const { round, game_id, player_id, answer } = req.query;
        const answerStats = { round, game_id, player_id, answer };

        AnswersService.addAnswer(
            req.app.get('db'),
            answerStats
        ).then((response) => res.status(201).json('Answer Posted'));
    });

module.exports = answersRouter;
