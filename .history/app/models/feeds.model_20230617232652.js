module.exports = (sequelize, Sequelize) => {
    const Feed = sequelize.define("feed", {
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
            type: Sequelize.STRING
        },
        admin_user_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true
    });

    return Feed;
};