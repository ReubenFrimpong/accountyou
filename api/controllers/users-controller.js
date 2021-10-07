exports.createUser =  (req, res, next) => {
  const user = new User(req.swagger.body);
  console.log(req.swagger)
  return res;
};

// APPROACH THE OPEN API FILES BY BREAKING THEM INTO SEPARATE COMPONENTS IN A MASTER YAML FILE THEN BUNDLE THEM