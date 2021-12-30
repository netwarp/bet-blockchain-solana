/*----------------------------
 *
 * WORKS ON POSTGRES ONLY !
 ---------------------------*/

 -- TABLE users
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS address VARCHAR(128);
ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(128);

-- TABLE transactions
CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY
);

ALTER TABLE transactions ADD COLUMN IF NOT EXISTS address VARCHAR(128);
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS signature VARCHAR(128);
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS accountKeys VARCHAR[];

