// model
const model = require('../../models');
const {Op} = require("sequelize");

/** User Info **/
exports.user_info = async (req, res, next) => {
    try {
        const user = await model.User_Info.findAll({
            include: [{
                model: model.Subscription,
                attributes: ['status'],
            }],
            attributes: { exclude: ['id', 'password', 'name', 'phone'] },
            where: {
                id: {
                    [Op.not]: 9999
                }
            }
        });

        res.json(user);
    } catch (error) {
        console.error(error);
        next(error);
    }
};