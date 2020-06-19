const CardsService = {
    getAllCards(db) {
        return db.select("*").from("cards");
    },
    getCardById(db, id) {
        return db
            .select("card_type", "card_copy", "thread_count", "card_count")
            .from("cards")
            .where("id", "=", id);
    },
};

module.exports = CardsService;
