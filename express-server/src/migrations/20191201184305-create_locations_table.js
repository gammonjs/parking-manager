'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("locations", {
            id: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
        
            name: {
                type: Sequelize.STRING(50),
                unique: true,
                collate: 'utf8_bin',
                defaultValue: Sequelize.NULL
            },
        
            street: {
                type: Sequelize.STRING(100),
                collate: 'utf8_bin',
                defaultValue: Sequelize.NULL
            },
        
            state: {
                type: Sequelize.STRING(10),
                collate: 'utf8_bin',
                defaultValue: Sequelize.NULL
            },
        
            zip: {
                type: Sequelize.STRING(10),
                collate: 'utf8_bin',
                defaultValue: Sequelize.NULL
            },
        
            hours: {
                type: Sequelize.STRING(100),
                collate: 'utf8_bin',
                defaultValue: Sequelize.NULL
            },
        
            price: {
                type: Sequelize.FLOAT,
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
