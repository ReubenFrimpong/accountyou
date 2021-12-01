const { create } = require('../factories/crud-factory');
const Dues = require('../../models/dues');

const fillable = ['userId', 'amount'];
exports.payDues = create(Dues, fillable);