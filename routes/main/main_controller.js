// model
const model = require('../../models');

/** Pickup Time **/
exports.pickup_time = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const day = data.day;
    const time = data.time;
    const salad = data.salad;

    const subscription_detail = await model.Subscription_Detail.findOne({
        where: {id: id}
    });

    if (subscription_detail.pickup_remain_count == 0) {
        res.send('더이상 예약할 수 없습니다.');
        return;
    }

    const pickup_info = await model.Pickup_Info.findOne({
        where: {subscriptionDetailId: id, day: day}
    });

    if (pickup_info == null) {
        await model.Pickup_Info.create({
            subscriptionDetailId: id,
            day: day,
            time: time,
            salad: salad
        })
            .then(result => {
                model.Subscription_Detail.update({
                    pickup_count: subscription_detail.pickup_count + 1,
                    pickup_remain_count: subscription_detail.pickup_remain_count - 1
                }, {
                    where: {id: id}
                })
                res.send('예약되었습니다.');
            })
            .catch(err => {
                res.send('예약에 실패했습니다.');
            });
    } else {
        await model.Pickup_Info.update({
            time: time
        }, {
            where: {subscriptionDetailId: id, day: day}
        })
            .then(result => {
                res.send('예약시간을 수정하였습니다.');
            })
            .catch(err => {
                console.log(err);
                res.send('예약시간 수정을 실패했습니다.');
            });
    }
}

/** Pickup Time Modify **/
exports.pickup_time_modify = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const day = data.day;
    const time = data.time;

    await model.Pickup_Info.update({
        time: time
    }, {
        where: {subscriptionDetailId: id, day: day}
    })
        .then(result => {
            res.send('예약시간이 수정되었습니다.');
        })
        .catch(err => {
            console.log(err);
            res.send('예약시간 수정에 실패했습니다.');
        });

}

/** Fixed Pickup Time **/
exports.fixed_pickup_time = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const time = data.time;

    await model.Subscription_Detail.update({
        pickup_fixed_time: time
    }, {
        where: {id: id}
    })
        .then(result => {
            res.send('픽업시간이 고정되었습니다.')
        })
        .catch(err => {
            console.log(err);
            res.send('픽업시간 고정에 실패했습니다.')
        });
}

/** Fixed Pickup Date **/
exports.fixed_pickup_date = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const date = data.date;

    await model.Subscription_Detail.update({
        pickup_fixed_date: date.toString()
    }, {
        where: {id: id}
    })
        .then(result => {
            console.log(result);
            res.send('픽업 날짜가 고정되었습니다.')
        })
        .catch(err => {
            console.log(err);
            res.send('픽업 날짜 고정에 실패했습니다.')
        });
}

/** Pickup Cancel **/
exports.pickup_cancel = async (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const day = data.day;

    const subscription_detail = await model.Subscription_Detail.findOne({
        where: {id: id}
    });

    await model.Pickup_Info.destroy({
        where: {subscriptionDetailId: id, day: day}
    })
        .then(result => {
            model.Subscription_Detail.update({
                pickup_count: subscription_detail.pickup_count - 1,
                pickup_remain_count: subscription_detail.pickup_remain_count + 1
            }, {
                where: {id: id}
            })
            console.log(result);
            res.send('예약이 취소되었습니다.')
        })
        .catch(err => {
            console.log(err);
            res.send('예약 취소를 실패했습니다.')
        });
}

/** Request Modify **/
exports.request_modify = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const request = data.request;

    await model.Subscription_Detail.update({
        request: request
    }, {
        where: {id: id}
    })
        .then(result => {
            console.log(result);
            res.send('요청사항이 수정되었습니다.')
        })
        .catch(err => {
            console.log(err);
            res.send('요청사항 수정에 실패했습니다.')
        });
}

/** Subscription Info **/
exports.subscription = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const subscription = await model.Subscription.findOne({
        where: {userInfoId: id}
    });

    if (subscription.status == 'N') {
        res.send('N');
    } else {
        const subscription_detail = await model.Subscription_Detail.findOne({
            include: [{
                model: model.Pickup_Info,
            }],
            where: {id: id}
        });
        res.json(subscription_detail);
    }
}