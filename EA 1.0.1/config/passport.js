const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const acc_function = require('../models/accounts.js');
const Joi =require('joi');

module.exports = function(passport) 
{
  // 'LOCAL'
  // passport.use(
  //   new LocalStrategy({usernameField: 'username', passwordField: 'userpassword'},
  //     async function (username, password, done) 
  //     {
  //       //kiểm tra ký tự
  //       console.log('da vao kiem tra');
  //       const schema = Joi.object( {
  //         username: Joi.string().min(6).max(32).required().trim().alphanum(),
  //         password: Joi.string().min(6).max(32).required().trim().alphanum()
  //       });
  //       if (schema.validate({username,password})) done(null, false, {message: "Invalid username or password."});
  //       console.log('da vao kiem tra joi');
  //       // kiểm tra tài khoản
  //       let user = await acc_function.Acc.findOne({username: username});
  //       if(!user) done(null, false, {message: "Invalid username or password."});
        
  //       const validPassword = await bcrypt.compare(password, user.userpassword);
  //       if (!validPassword) return done(null, false, {message: "Invalid username or password."});
  //       console.log('da kiem tra mat khau');
  //       return done(null, user);

  //     }
  //   )
  // )

  passport.use(new LocalStrategy({usernameField: 'username',passwordField: 'userpassword'},
  async function(username, password, done) {
      acc_function.Acc.findOne({username:username}, async function(err, user) {

        if (err) return done(null, false, {message: 'Invalid username or password.'});
        if (!user) return done(null, false, {message: 'Invalid username or password.'}); 
        const validPassword = await bcrypt.compare(password, user.userpassword).catch(err=> console.log(err.message));
        if (!validPassword) return done(null, false, {message: 'Invalid username or password.'});
        return done(null, user);
      })
      

  }));
  passport.serializeUser((user, done) => {
    done(null, user._id, user.username, user.role);
});

passport.deserializeUser((id, done) => {
  acc_function.Acc.findById(id,function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});

}
