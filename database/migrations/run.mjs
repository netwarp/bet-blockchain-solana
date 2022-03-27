// TODO debug

import fs from 'fs'
import config from '../../services/config.mjs'
const pool = new Pool({
    user: config.database.username,
    host: 'localhost',
    database: config.database.name,
    password: config.database.password,
    port: 3211,
})


async function migrate() {
    let sql = fs.readFileSync(new URL('./main.sql', import.meta.url), 'utf8')
}

await migrate()
//console.log('\x1b[32m', 'Script finished, but check your database anyway' ,'\x1b[0m');
process.exit()