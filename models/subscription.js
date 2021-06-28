const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const subscription = sequelize.define('subscription', {
    userInfoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'subscription',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  subscription.associate = function (models) {
    subscription.belongsTo(models.User_Info, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: true,
      },
    });
  };

  return subscription;
};
