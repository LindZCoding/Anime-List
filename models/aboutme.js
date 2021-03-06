'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aboutMe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.aboutMe.belongsTo(models.user)
    }
  };
  aboutMe.init({
    userId: DataTypes.INTEGER,
    personalText: DataTypes.STRING(2000)
  }, {
    sequelize,
    modelName: 'aboutMe',
  });
  return aboutMe;
};