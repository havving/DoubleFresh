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

/** Scheduler Time **/
exports.schedule_time = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = req.body;

    const id = data.id;
    const day = data.day;
    const time = data.time;

    const pickup_info = await model.Pickup_Info.findOne({
        where: {id: id, day: day}
    });

    if (pickup_info == null) {
        await model.Pickup_Info.create({
            id: id,
            day: day,
            time: time
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