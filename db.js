const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todos.db'
})

const Todos = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(100),
        allowNull: true,

    },
    duedate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW + 1,
        allowNull: false
    },
    priority: {
        type: Sequelize.ENUM('High', 'Low', 'Medium'),
        defaultValue: 'Medium',
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('Complete', 'Incomplete'),
        defaultValue: 'Incomplete'
    },

})

const Notes = db.define('notes', {
    Notes: Sequelize.STRING

})
Todos.hasMany(Notes)

module.exports = {
    db,
    Todos
}