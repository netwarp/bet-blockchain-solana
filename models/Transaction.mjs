import Sequelize from 'sequelize'
import sequelize from '../services/sequelize.mjs'

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
    status: {
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