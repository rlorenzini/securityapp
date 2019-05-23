'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'WatchLists',
      'userid', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'WatchLists',
      'userid'
    )
  }
};
