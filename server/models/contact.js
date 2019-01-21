export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Contact already exists',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Contact name field cannot be empty',
        },
        len: {
          args: [2, 30],
          msg: 'Contact name characters must be minimum 2 and maximum 30',
        },
      },
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Phone number already registered',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone number field cannot be empty',
        },
        isNumeric: {
          args: true,
          msg: 'Only Numbers are allowed',
        },
        len: {
          args: [11, 13],
          msg: 'Invalid number digits',
        },
      },
    },
  }, {});

  Contact.associate = (models) => {
    Contact.hasMany(models.Sms, {
      as: 'sentMessages',
      foreignKey: 'senderId',
    });
    Contact.hasMany(models.Sms, {
      as: 'receivedMessages',
      foreignKey: 'receiverId',
    });
  };
  return Contact;
};
