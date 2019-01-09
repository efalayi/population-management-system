"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SubLocation extends _sequelize.default.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        unique: true
      },
      parentLocationId: {
        allowNull: false,
        type: DataTypes.STRING
      }
    }, {
      timestamps: true,
      tableName: 'subLocations',
      sequelize
    });
  }

  static associate(models) {
    SubLocation.belongsTo(models.Location, {
      as: 'parentLocation',
      foreignKey: 'parentLocationId'
    });
  }

}

var _default = SubLocation;
exports.default = _default;