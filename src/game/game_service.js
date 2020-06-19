const GamesService = {
    getGameById(db, id) {
        return db.select("*").from("game").where("id", "=", id);
    },
    addGame(db, newGame) {
        return db.insert(newGame).into("game");
    },
    updateGame(db, gameId, gameUpdates) {
        return db("game").where("id", "=", gameId).update(gameUpdates);
    },
    clearUsers(db, gameId, toBeCleared) {
        return db
            .select(toBeCleared)
            .from("game")
            .where("id", "=", gameId)
            .clearWhere();
    },
};

module.exports = GamesService;
