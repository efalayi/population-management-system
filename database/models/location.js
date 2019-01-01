import Sequelize from 'sequelize'

class Location extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
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
    })
  }

  static associate(models) {
    Location.hasMany(models.SubLocation, {
      as: 'subLocations',
      foreignKey: 'parentLocationId',
      sourceKey: 'id',
    })
  }
}

export default Location
