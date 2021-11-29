const { createUser, getAllUsers, getUser, updateUser, deleteUser } = require('./controllers/users-controller');
const { auth } = require('./middlewares/auth-middleware');
const { login } = require('./controllers/auth-controller');

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  auth,
  login,
}