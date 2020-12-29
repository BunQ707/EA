const express = require('express');
const Joi = require('joi');
const acc_function = require('../models/accounts.js');
const post_function = require('../models/posts');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth= require('../mw/auth');
const LocalStrategy = require('passport-local').Strategy;


require('../config/passport')(passport);

/* GET home page. */
router.get('/', async function(req, res, next) {
  if (!req.isAuthenticated()) res.render("login");
  else 
    res.render('index');
    // res.render('index', {role: req.session.passport.user.role});

});
router.get('/index', async function(req, res, next) {
  if (!req.isAuthenticated()) res.render("login");
  else res.render('index');
});
// Đăng ký: ==========================================================================
router.route('/register')
  .get(async function(req, res, next) {
    if (req.isAuthenticated()) res.redirect('/'); else
    res.render('register');
  })
  .post(async function(req, res, next) {
    // Kiểm tra:
    const {error} = validate1(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await acc_function.Acc.findOne({username: req.body.username});
    if(user) return res.status(400).send('User existed.');
    // Đã kiểm tra, đủ điều kiện:
    newuser = await acc_function.addRenter(req.body.username, req.body.userpassword);

    // Gửi token: =================================================================
    // const token =jwt.sign({ _id: newuser._id, role: newuser.role},'privateKey');
    // const token= acc_function.Acc.generateAuthToken()
    // res.header('x-auth-token', token).send(req.body);
  })

router.route('/register/owner')
  .get(async function(req, res, next) {
    if (req.isAuthenticated()) res.redirect('/'); else
    res.render('register-owner');
  })
  .post(async function(req, res, next) {
    // Kiểm tra:
    const {error} = validate2(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await acc_function.Acc.findOne({username: req.body.username});
    if(user) return res.status(400).send('User existed.');
    // Đã kiểm tra, đủ điều kiện:
    newuser = await acc_function.addOwner(req.body.username, req.body.userpassword, req.body.hoten_o, req.body.cccd_o, req.body.sdt_o, req.body.diachi_o, req.body.mail_o);
    res.redirect('/login');
  })


// Đăng nhập ==========================================================================
router.route('/login')
  .get(async function(req, res, next) {
    if (req.isAuthenticated()) res.redirect('/'); else
    res.render('login');
  })

router.post('/login', passport.authenticate('local', { successRedirect: '/',
failureRedirect: '/login' }));

router.route('/logout')
    .get((req, res) => {
      if (req.isAuthenticated())
      {
        console.log('logging out');
        req.logout();
        req.session.destroy(err => {
            res.clearCookie();
            // res.redirect('/');
        });
      }
      res.redirect('/');
    })
    .post((req, res) => {
        console.log('logging out');
        req.logout();
        req.session.destroy(err => {
            res.clearCookie();
            res.redirect('/');
        });
    })
// Hàm xác thực cấu trúc cho username, password ===========================================
function validate1(req)
{
  const schema = Joi.object( {
    username: Joi.string().min(6).max(32).required().trim().alphanum(),
    userpassword: Joi.string().min(6).max(32).required().trim().alphanum()
  });
  return schema.validate(req);
}
// Xác thực mở rộng cho owner:============================================================
function validate2(req)
{
  const schema = Joi.object( {
    username: Joi.string().min(6).max(32).required().trim().alphanum(),
    userpassword: Joi.string().min(6).max(32).required().trim().alphanum(),

    hoten_o: Joi.string().max(255).required(),
    cccd_o: Joi.string().trim().length(12).alphanum().required(),
    sdt_o: Joi.string().trim().required(),
    diachi_o: Joi.string().max(255).allow(null, ''),
    mail_o: Joi.string().email().allow(null, '')

  });
  return schema.validate(req);
}
//=========================== USER =============================================================
router.get('/user/me', async function(req, res, next) {
  if (!req.session.passport.user) res.status(400).send('No user');
  let apost= await acc_function.Acc.findById(req.session.passport.user); 
  res.send(apost);
  // res.send(req.user[0].role);
});

router.route('/post/prepare')
  // .all(auth)
  .get((req, res) => {
    res.render('create_post');
  })
  .post(async (req,res) => {
    
    await post_function.preparepost(
        req.body.tieude_p, req.body.quanhuyen_p, req.body.duong_p, req.body.chitiet_p, req.body.goiy_p, req.body.phanloai_p, req.body.soluong_p, 
        req.body.gia_p, req.body.dientich_p, req.body.chungchu_p, req.body.phongtamkhepkin_p, req.body.phongtamnonglanh_p, 
        req.body.phongbep_p, req.body.dieuhoa_p, req.body.bancong_p, req.body.giadien_p, req.body.gianuoc_p, req.body.khac_p
    )
    res.json(req.body);
  })
  // TODO: sau khi xử lý thì res về một thông báo


router.route('/post/:id')
  // .all(auth)
  .get( async (req,res) => {
    let apost= await post_function.findpostbyid(req.params.id);
    // if(!apost) 
    res.send(apost);
  });
router.route('/search')
  .post( async (req,res) =>{
    if (!req.isAuthenticated) res.status(400, "Bad req");
    let a = await post_function.Post.find()
      .or([
        {tieude: /.*req.body.keyword*./i},
        {quanhuyen: /.*req.body.keyword*./i},
        {duong:  /.*req.body.keyword*./i},
        {chitiet:  /.*req.body.keyword*./i},
        {goiy:  /.*req.body.keyword*./i}
      ])
      .limit(10)
      .skip(1*9)
      .catch(err=> err.message);
    res.send(a);
    // console.log('reach');
  })
  .get(async (req,res) =>{
    if (!req.isAuthenticated) res.status(400, "Bad req");
    let a = await post_function.Post.find({});
      
    res.send(a);
    // console.log('reach');
  }

  )

module.exports = router;









