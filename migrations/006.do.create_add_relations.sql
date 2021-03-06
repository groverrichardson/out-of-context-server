ALTER TABLE IF EXISTS game
  ADD COLUMN IF NOT EXISTS active_card INTEGER REFERENCES cards(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS game
  ADD COLUMN IF NOT EXISTS active_wild_card INTEGER REFERENCES cards(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS players
  ADD COLUMN IF NOT EXISTS game_id INTEGER REFERENCES game(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS messages
  ADD COLUMN IF NOT EXISTS player_id INTEGER REFERENCES players(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS messages
  ADD COLUMN IF NOT EXISTS game_id INTEGER REFERENCES game(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS answers
  ADD COLUMN IF NOT EXISTS game_id INTEGER REFERENCES game(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS answers
  ADD COLUMN IF NOT EXISTS player_id INTEGER REFERENCES players(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS game
  ADD COLUMN IF NOT EXISTS current_judge INTEGER REFERENCES players(id) ON DELETE CASCADE;

