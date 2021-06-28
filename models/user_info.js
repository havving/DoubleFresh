const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const user_info = sequelize.define('user_info', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_info',
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

  user_info.associate = function (models) {
    models.User_Info.hasOne(models.Subscription, {
      foreignKey: 'id',
      onDelete: 'cascade',
    });
  };

  return user_info;
};
