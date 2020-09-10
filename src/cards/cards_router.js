const express = require('express');
const CardsService = require('./cards_service');

const cardsRouter = express.Router();

cardsRouter.route('/card').get((req, res, next) => {
    CardsService.getAllCards(req.app.get('db')).then((cards) => {
        res.json(cards);
    });
});

cardsRouter.route('/card/:cardId').get((req, res, next) => {
    CardsService.getCardById(req.app.get('db'), req.params.cardId).then(
        (card) => {
            res.json(card);
        }
    );
});

cardsRouter.route('/active-card/:gameId').get((req, res, next) => {
    CardsService.getActiveCard(
        req.app.get('db'),
        req.params.gameId
    ).then((card) => res.json(card));
});

module.exports = cardsRouter;
