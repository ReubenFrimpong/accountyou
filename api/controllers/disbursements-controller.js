const crudFactory = require('../factories/crud-factory');
const Disbursement = require('../../models/disbursement');

const fillable = ['userId', 'amount']
exports.disburse = crudFactory.create(Disbursement, fillable);
exports.getAllDisbursements = crudFactory.getAll(Disbursement);