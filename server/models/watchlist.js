'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchList = sequelize.define('WatchList', {
    title: DataTypes.STRING,
    imdbid: DataTypes.STRING
  }, {});
  WatchList.associate = function(models) {
    // associations can be defined here
  };
  return WatchList;
};