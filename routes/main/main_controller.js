exports.main = (req, res, next) => {
    res.render('index')
}

exports.login = (req, res, next) => {
    res.render('login', {page: 'login'})
}

exports.signup = (req, res, next) => {
    res.render('signup', {page: 'signup'})
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