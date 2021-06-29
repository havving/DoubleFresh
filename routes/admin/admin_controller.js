// model
const model = require('../../models');
const {Op} = require("sequelize");

/** User Info **/
exports.user_info = async (req, res, next) => {
    try {
        const user = await model.User_Info.findAll({
            attributes: ['id', 'name', 'phone'],
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

/** User Info Detail **/
exports.user_info_detail = async (req, res, next) => {
    const id = req.params.id;

    try {
        const isStatus = await model.Subscription.findOne({
            attributes: ['status'],
            where: {userInfoId: id}
        });

        if (isStatus.status == 'Y') {
            const user = await model.Subscription_Detail.findOne({
                attributes: ['sub_week_count', 'pickup_total_count', 'pickup_count',
                    'pickup_remain_count', 'request'],
                where: {id: id}
            });
            res.json(user);
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
};