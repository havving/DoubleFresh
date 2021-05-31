const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

passport.use('local-login', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: true
}, (req, id, password, done) => {
    console.log('passport의 local-login : ', id, password)

    if (id != req|| password != "1111") {
        console.log('비밀번호 불일치!')
        return done(null, false, req.flash('loginMessage', '비밀번호 불일치!'));
    }

    console.log('비밀번호 일치!')
    return done(null, {
        id: id,
        password: password
    });

}));

passport.serializeUser(function (user, done) {
    console.log('serializeUser() 호출됨.');
    console.log(user);

    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('deserializeUser() 호출됨.');
    console.log(user);

    done(null, user);
});


module.exports = passport