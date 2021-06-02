const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

passport.use('local-login', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: true
}, (req, id, password, done) => {
    console.log('passport local-login : ', id, password)

}));

// 사용자 인증에 성공했을 때 호출
passport.serializeUser(function (user, done) {
    console.log('serializeUser() 호출됨.');
    console.log(user);

    done(null, user);
});

// 사용자 인증 이후, 사용자 요청이 있을 때마다 호출
passport.deserializeUser(function (user, done) {
    console.log('deserializeUser() 호출됨.');
    console.log(user);

    done(null, user);
});


module.exports = passport