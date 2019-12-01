'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("spaces", {

            id: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
        
            location_id: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: false
            },
        
            available: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
        
            creditCards: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
        
            covered: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
        
            handicap: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("locations");
    }
};
