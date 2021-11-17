'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favoriteCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favoriteCharacter.belongsTo(models.user)
    }
  };
  favoriteCharacter.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    about: DataTypes.STRING,
    nicknames: DataTypes.STRING,
    voice_actors: DataTypes.STRING,
    animeName: DataTypes.STRING,
    mal_id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favoriteCharacter',
  });
  return favoriteCharacter;
};