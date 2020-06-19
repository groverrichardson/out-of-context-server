const PlayersService = {
    getAllPlayers(db) {
        return db.select("*").from("players");
    },
    getPlayerById(db, id) {
        return db
            .select("card_type", "card_copy", "thread_count", "card_count")
            .from("players")
            .where("id", "=", id);
    },
    addPlayer(db, newPlayer) {
        return db.insert(newPlayer).into("players");
    },
};

module.exports = PlayersService;
