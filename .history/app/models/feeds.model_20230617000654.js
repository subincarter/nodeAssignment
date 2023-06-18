module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.JSON
        },
        user_id: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true
    });

    return Users;
};