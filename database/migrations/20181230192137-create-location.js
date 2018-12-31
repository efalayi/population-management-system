export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('locations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
      unique: true
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    numberOfFemales: {
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    numberOfMales: {
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    totalResidents: {
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('locations')
}
