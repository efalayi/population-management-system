"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Location extends _sequelize.default.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        unique: true
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      numberOfFemales: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER
      },
      numberOfMales: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER
      },
      totalResidents: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER
      }
    }, {
      timestamps: true,
      tableName: 'locations',
      sequelize
    });
  }

  static associate(models) {
    Location.hasMany(models.SubLocation, {
      as: 'subLocations',
      foreignKey: 'parentLocationId',
      sourceKey: 'id'
    });
  }

}

var _default = Location;
exports.default = _default;