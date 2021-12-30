import {config} from '../../index.mjs'

import {Sequelize} from 'sequelize'
import fs from 'fs'
import util from "util";
const readFile = util.promisify(fs.readFile);
import path  from 'path';
const __dirname = path.resolve();

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: 'localhost',
    dialect: 'postgres'
})

async function tryConnect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully. poop');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function getMigrations() {
    let sql = await readFile(__dirname + '/database/migrations/main.sql', 'utf-8')
    return sql
}
await getMigrations().then(data => {
    console.log(data)
    sequelize.query(data, {raw: true})
})



process.exit()