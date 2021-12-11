const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Upvotes extends Model {}

Upvotes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    },
    downvotes: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id'
      }
    }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'upvotes',
  }
);

module.exports = Upvotes;
