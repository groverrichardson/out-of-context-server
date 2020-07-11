const GamesService = {
    getGameById(db, id) {
        return db.select("*").from("game").where("id", "=", id);
    },
    addGame(db, newGame) {
        return db.insert(newGame).into("game").returning("id");
    },
    updateGame(db, id, gameUpdates) {
        return db("game").where("id", "=", id).update(gameUpdates);
    },
    clearUsers(db, id, gameUpdates) {
        return db("game").where("id", "=", id).update(gameUpdates);
    },
    insertCardId(db, id, cardId) {
        return db.raw(
            `UPDATE game SET cards_played = array_append(cards_played, ${cardId}) WHERE id = ${id}`
        );
    },
    insertPlayerId(db, id, playerId) {
        return db.raw(
            `UPDATE game SET player_ids = array_append(player_ids, ${playerId}) WHERE id = ${id}`
        );
    },
    updatePlayer(db, playerId, playerUpdates) {
        return db("player").where(("id", "=", playerId).update(playerUpdates));
    },
    addPlayer(db, player_stats) {
        return db.insert(player_stats).into("players").returning("id");
    },
};

module.exports = GamesService;
