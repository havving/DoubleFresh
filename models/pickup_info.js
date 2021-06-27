const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const pickup_info = sequelize.define('pickup_info', {
    subscriptionDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    salad: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pickup_info',
    timestamps: false
  });

  pickup_info.associate = function (models) {
    pickup_info.belongsTo(models.Subscription_Detail, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: true,
      },
    });
  };

  return pickup_info;
};
