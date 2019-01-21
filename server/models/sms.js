export default (sequelize, DataTypes) => {
  const Sms = sequelize.define('Sms', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    smsStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'UNREAD',
    },
  }, {});

  Sms.associate = (models) => {
    Sms.belongsTo(models.Contact, {
      foreignKey: 'senderId',
      as: 'sender',
      onDelete: 'CASCADE',
    });
    Sms.belongsTo(models.Contact, {
      foreignKey: 'receiverId',
      as: 'receiver',
      onDelete: 'CASCADE',
    });
  };
  return Sms;
};
