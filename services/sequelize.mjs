import config from "./config.mjs"
import Sequelize from "sequelize"

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
})

export default sequelize