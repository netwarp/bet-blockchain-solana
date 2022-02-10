import fs from 'fs'
import sequelize from '../../services/sequelize.mjs'

async function tryConnect() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully. poop')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
// await tryConnect()

async function migrate() {
    let sql = fs.readFileSync(new URL('./main.sql', import.meta.url), 'utf8')
    sequelize.query(sql, {raw: true})
}

await migrate()

process.exit()