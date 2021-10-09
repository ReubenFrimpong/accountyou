exports.getAllUsers = (req, res, next) => {
  res.json(['User 1', 'User 2', 'User 3']);
}

exports.createUser =  (req, res, next) => {
  const user = new User(req.swagger.body);
  console.log(req.swagger)
  return res;
};