DROP TYPE IF EXISTS game_status;
CREATE TYPE game_status AS ENUM (
  'Active',
  'Not Active'
);

CREATE TABLE IF NOT EXISTS game (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    game_status game_status NOT NULL,
    round INTEGER DEFAULT 1 NOT NULL,
    number_of_players INTEGER DEFAULT 4,
    cards_played INTEGER[]
);
