const users = require('./../Model/UserModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const checkPass = (candidatePass, pass) => {
  return bcrypt.compare(candidatePass, pass);
};

exports.signUp = async (req, res) => {
  try {
    const resp = await users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      img: req.body.img,
      confirmPassword: req.body.confirmPassword,
      role: req.body.role,
    });

    const token = signToken(resp._id);

    res.status(201).json({
      token,
      resp,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).json({
        message: '',
      });

    const getEmail = await users.findOne({ email });

    if (!getEmail || !(await checkPass(password, getEmail.password)))
      return res.status(401).json({
        message: '',
      });

    const token = signToken(getEmail._id);
    res.status(200).json({
      token,
      getEmail,
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
    console.log(err);
  }
};

exports.isLogin = async (req, res, next) => {
  const auth = req.headers.authorization?.split(' ')[1];
  ////////////////
  console.log(auth);
  let dec;
  jwt.verify(auth, process.env.JWT_SECRET, function (err, decoded) {
    dec = decoded;
    console.log(dec);
  });
  const candidate = await users.findById(dec.id);
  console.log(candidate);
  if (!candidate) return next(new Error('unknown user'));

  if (candidate.isPassChanged(dec.iat)) return next(new Error('unknown user'));

  req.user = candidate;

  next();
};

exports.strictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(new Error('forbiden'));

    next();
  };
};
