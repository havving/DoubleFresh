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
    const data  = req.body;
    console.log('---post방식이 구동되었습니다.---');
    console.log(data);
    const text = data.id + ' ' + data.name + ' ' + data.age + '살';
    console.log("전송데이터 : " + text)
    res.send(text);
}


exports.login = (req, res, next) => {
    res.render('login', {page: 'login'})
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