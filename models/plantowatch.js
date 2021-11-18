'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class planToWatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.planToWatch.belongsTo(models.user)
    }
  };
  planToWatch.init({
    name: DataTypes.STRING,
    animeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    synopsis: DataTypes.STRING(2000),
    episodes: DataTypes.STRING,
    score: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'planToWatch',
  });
  return planToWatch;
};