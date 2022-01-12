-- DROP TYPE IF EXISTS status;
-- CREATE TYPE status AS ENUM ('active', 'complete');

CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  current_status VARCHAR NOT NULL,
  user_id BIGINT REFERENCES users(id)
 
);