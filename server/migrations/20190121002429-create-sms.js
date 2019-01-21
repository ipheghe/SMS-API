module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      smsStatus: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      senderId: {
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'senderId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      receiverId: {
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'receiverId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        type: Sequelize.INTEGER,
      },
    }),
    down: (queryInterface) => queryInterface.dropTable('Sms'),
};
