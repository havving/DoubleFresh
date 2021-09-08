// ★ DB connection
const mysql = require('mysql');
const dbConfig = require('../config/db_config');
const connection = mysql.createConnection(dbConfig);

// model
const model = require('../../models');

/** User Info **/
exports.user_info = async (req, res, next) => {
    const sql = 'SELECT user_info.id, user_info.name, user_info.phone, subscription.status ' +
        'FROM user_info ' +
        'LEFT OUTER JOIN subscription ON user_info.id = subscription.userInfoId ' +
        'WHERE user_info.id != 9999;'

    connection.query(sql, function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.send(results);
    });
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
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/** Pickup Info **/
exports.pickup = async (req, res, next) => {
    const day = req.params.day;

    const sql = 'SELECT user_info.name, pickup_info.time, subscription_detail.request ' +
        'FROM user_info ' +
        'LEFT OUTER JOIN pickup_info ON user_info.id = pickup_info.subscriptionDetailId ' +
        'LEFT OUTER JOIN subscription_detail ON user_info.id = subscription_detail.id ' +
        'WHERE pickup_info.day=?';

    connection.query(sql, [day], function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        res.send(results);
    });
};