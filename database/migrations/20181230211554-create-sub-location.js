export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('subLocations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
      unique: true,
      references: {
        model: 'locations',
        referenceKey: 'id',
      },
      onDelete: 'cascade'
    },
    parentLocationId: {
      allowNull: false,
      type: Sequelize.STRING
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
  down: queryInterface => queryInterface.dropTable('subLocations')
}
