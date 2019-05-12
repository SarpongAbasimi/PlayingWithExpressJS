const User = require('../model/User')
,mongoose = require('mongoose')
,Bcrypt = require('bcryptjs');


exports.registration = (req, res)=> {
  res.render('signup')
};

exports.submitRegistration = (req, res)=> {
  req.check('email','The email you entered is invalid').isEmail();
  req.check('password','Password must be at least 6 characters long').isLength({ min: 3});
  req.check('password','Password must be equal to your confirmation password').equals(req.body.confirm_password);

  const errors = req.validationErrors();
  if(errors){
    res.render('signup', {errors:errors})
  }else{
    const {email, name, password} = req.body
    Bcrypt.hash(password, 10,(err, hash)=>{
      if(err){ console.log('There was an error')}
      const user = new User({_id: mongoose.Types.ObjectId(), name, email, password: hash});
      user.save().then(result =>{ console.log('registration was successful')})
      .catch(err=> console.log('There was an error'))
    });
    res.redirect('/registration/login')
  };
};

exports.login = (req, res)=>{
  res.render('login')
}

