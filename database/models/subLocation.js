import Sequelize from 'sequelize'

class SubLocation extends Sequelize.Model {
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
        type: DataTypes.STRING,
      }
    }, {
      timestamps: true,
      tableName: 'subLocations',
      sequelize
    })
  }

  static associate(models) {
    SubLocation.belongsTo(models.Location, {
      as: 'parentLocation',
      foreignKey: 'parentLocationId',
    })
  }
}

export default SubLocation
