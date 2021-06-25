// model
const model = require('../../models');

exports.main = (req, res, next) => {
    // res.render('index')
    res.header("Access-Control-Allow-Origin", "*");
    console.log('---get방식이 구동되었습니다.---');
    const text = 'get으로 나타나는 데이터!';
    console.log("전송데이터 : " + text)
    res.send(text);
}

exports.data = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;
    console.log('---post방식이 구동되었습니다.---');
    console.log(data);
    const text = data.id + ' ' + data.name + ' ' + data.age + '살';
    console.log("전송데이터 : " + text)
    res.send(text);
}

exports.get = (req, res, next) => {
    res.json({id: req.params.id});
}

exports.json = (req, res, next) => {
    // json 형식의 데이터를 응답(반환)의 내용으로 전송
    res.json([
        {
            'id': 950821,
            'name': 'HHB'
        },
        {
            'id': 711024,
            'name': 'JBK'
        },
    ])
}

/** Pickup Time **/
exports.pickup_time = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const day = data.day;
    const time = data.time;
    const salad = data.salad;

    const pickup_info = await model.Pickup_Info.findOne({
        where: {id: id, day: day}
    });

    if (pickup_info == null) {
        await model.Pickup_Info.create({
            id: id,
            day: day,
            time: time,
            salad: salad
        })
            .then(result => {
                console.log('데이터 추가 완료');
                res.send('예약 완료');
            })
            .catch(err => {
                console.log('데이터 추가 실패');
                res.send('예약 실패');
            });
    } else {
        await model.Pickup_Info.update({
            time: time
        }, {
            where: {id: id, day: day}
        })
            .then(result => {
                console.log('데이터 수정 완료');
                res.send('예약시간 수정 완료');
            })
            .catch(err => {
                console.log('데이터 수정 실패');
                res.send('예약시간 수정 실패');
            });
    }
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
            console.log('픽업시간이 고정되었습니다.');
            res.send('픽업시간이 고정되었습니다.')
        })
        .catch(err => {
            console.log('픽업시간 고정에 실패했습니다.');
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
            console.log('픽업 날짜가 고정되었습니다.');
            res.send('픽업 날짜가 고정되었습니다.')
        })
        .catch(err => {
            console.log('픽업 날짜 고정에 실패했습니다.');
            res.send('픽업 날짜 고정에 실패했습니다.')
        });
}