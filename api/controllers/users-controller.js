const User = require('../../models/user');
const crudFactory = require('../factories/crud-factory');

const fillable = ['username', 'email'];
exports.getAllUsers = crudFactory.getAll(User);
exports.getUser = crudFactory.getOne(User);
exports.createUser =  crudFactory.create(User, fillable);
exports.updateUser = crudFactory.update(User, fillable);
exports.deleteUser = crudFactory.delete(User);