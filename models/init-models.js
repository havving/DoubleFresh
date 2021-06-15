const DataTypes = require("sequelize").DataTypes;
const _pickup_info = require("./pickup_info");
const _subscription = require("./subscription");
const _subscription_detail = require("./subscription_detail");
const _user_info = require("./user_info");

function initModels(sequelize) {
  const pickup_info = _pickup_info(sequelize, DataTypes);
  const subscription = _subscription(sequelize, DataTypes);
  const subscription_detail = _subscription_detail(sequelize, DataTypes);
  const user_info = _user_info(sequelize, DataTypes);


  return {
    pickup_info,
    subscription,
    subscription_detail,
    user_info,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
