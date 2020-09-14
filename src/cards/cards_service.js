const CardsService = {
    getAllCards(db) {
        return db.select('*').from('cards');
    },
    getCardById(db, id) {
        return db
            .select('card_type', 'card_copy', 'thread_count', 'message_count')
            .from('cards')
            .where('id', '=', id);
    },
    getActiveCard(db, gameId) {
        return db.select('active_card').from('game').where('id', '=', gameId);
    },
};

module.exports = CardsService;
