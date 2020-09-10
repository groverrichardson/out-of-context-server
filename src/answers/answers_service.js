const AnswersService = {
    getAnswersForRound(db, round, game_id) {
        return db
            .select('*')
            .from('answers')
            .where('round', '=', round)
            .where('game_id', '=', game_id);
    },

    addAnswer(db, answerStats) {
        return db.insert(answerStats).into('answers');
    },
};

module.exports = AnswersService;
