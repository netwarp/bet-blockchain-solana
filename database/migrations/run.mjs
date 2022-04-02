import fs from 'fs'
import pkg from 'pg';
const {Pool, Client} = pkg;

import config from '../../services/config.mjs'
const pool = new Pool({
    user: config.database.username,
    host: 'localhost',
    database: config.database.name,
    password: config.database.password,
    port: 5432,
})

async function migrate() {
    let sql = fs.readFileSync(new URL('./main.sql', import.meta.url), 'utf8')

    await pool.query(sql)
    await pool.end()
}

await migrate()
console.log('\x1b[32m', 'Script finished, but check your database anyway' ,'\x1b[0m')

process.exit()