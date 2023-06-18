module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true

        },
        name: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        access: {
            type: Sequelize.JSON
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    });

    return Users;
};