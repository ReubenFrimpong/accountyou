const { createUser, getAllUsers, updateUser, deleteUser } = require('./controllers/users-controller');
const { isUserLoggedIn } = require('./middlewares/auth-middleware');

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  isUserLoggedIn
}