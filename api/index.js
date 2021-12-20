const { createUser, getAllUsers, getUser, updateUser, deleteUser } = require('./controllers/users-controller');
const { payDues, totalDuesPaid } = require('./controllers/dues-controller');
const { disburse, getAllDisbursements } = require('./controllers/disbursements-controller');
const { login } = require('./controllers/auth-controller');

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  payDues,
  totalDuesPaid,
  disburse,
  getAllDisbursements,
  login,
}