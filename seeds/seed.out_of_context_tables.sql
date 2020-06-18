TRUNCATE
    messages,
    players,
    game,
    cards
    RESTART IDENTITY CASCADE;

COPY cards FROM '/Users/Grover/Dropbox (Grove Of All Trades)/Development/Practice/out-of-context/assets/out_of_context_card_data.csv' DELIMITER ',' CSV HEADER;
