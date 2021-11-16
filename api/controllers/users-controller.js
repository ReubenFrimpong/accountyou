const jwt = require('jsonwebtoken');

exports.getAllUsers = (req, res, next) => {
  res.json(['User 1', 'User 2', 'User 3']);
}

exports.createUser =  (req, res, next) => {
  const user = new User(req.body);
  console.log(req)
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  res.json({
    token,
    data: {
      user
    }
  });
};