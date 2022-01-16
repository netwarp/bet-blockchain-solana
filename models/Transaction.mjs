import Sequelize from 'sequelize'
import toml from 'toml'
import fs from 'fs'
const file = fs.readFileSync('config.toml', 'utf8')
const config = toml.parse(file)

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: 'localhost',
    dialect: 'postgres'
})

class Transaction extends Sequelize.Model {}

const attributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address: {
        type: Sequelize.STRING
    },
    signature: {
        type: Sequelize.STRING
    },
    createdAt: {type: Sequelize.DATE, field: 'created_at'},
    updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
}

const options = {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions'
}

Transaction.init(attributes, options)

export default Transaction