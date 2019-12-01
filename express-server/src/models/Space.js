import Sequelize from 'sequelize';
import connection from '../database/connection';

const Space = connection.define('Spaces', {
  
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
    }
});

export default Space;