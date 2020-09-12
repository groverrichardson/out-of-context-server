TRUNCATE
    messages,
    players,
    game,
    cards
    RESTART IDENTITY CASCADE;

COPY cards FROM '../assets/seed.out_of_context_tables.sql' DELIMITER ',' CSV HEADER;
