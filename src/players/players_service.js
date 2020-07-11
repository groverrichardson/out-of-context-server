const PlayersService = {
    getAllPlayers(db) {
        return db.select("*").from("players");
    },
    getPlayerById(db, id) {
        return db
            .select("player_name", "points", "player_status", "game_id")
            .from("players")
            .where("id", "=", id);
    },
    addPlayer(db, newPlayer) {
        return db.insert(newPlayer).into("players");
    },
    updatePlayer(db, id, playerUpdates) {
        return db("players").where("id", "=", id).update(playerUpdates);
    },
};

module.exports = PlayersService;
