const User = require('../../models/user');
const crudFactory = require('../factories/crud-factory');

const fillable = ['username', 'email', 'role'];
const populate = 'dues';

exports.getAllUsers = crudFactory.getAll(User);
exports.getUser = crudFactory.getOne(User, populate);
exports.createUser =  crudFactory.create(User, fillable);
exports.updateUser = crudFactory.update(User, fillable);
exports.deleteUser = crudFactory.delete(User);