const _ = require('lodash');
const { catchAsync } = require('../utils/catch-async');
const { sendResponse } = require('../utils/rest-response');
const AppError = require('../utils/app-error');

const getFillableFields = (req, fillable) => {
  let newEntity = {};
  Object.entries(req.body).forEach(([key, value]) => {
    if (fillable.includes(key)) {
      newEntity[key] = value;
    }
  });
  return newEntity;
}

exports.getAll = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.find();
  sendResponse(res, 200, doc);
});

exports.getOne = (Model, populate) => catchAsync(async (req, res, next) => {
  const doc = await Model.findById(req.params.id).populate(populate);
  if (!doc) {
    return next(new AppError('No result found with this ID', 404));
  }
  sendResponse(res, 200, doc);
});

exports.create = (Model, fillable = []) => catchAsync(async (req, res, next) => {
  let newEntity = req.body;
  if(!_.isEmpty(fillable)) {
    newEntity = getFillableFields(req, fillable);
  }
  const doc = await Model.create(newEntity);
  sendResponse(res, 201, doc);
});

exports.update = (Model, fillable = []) => catchAsync(async (req, res, next) => {
  let entity = req.body;
  if(!_.isEmpty(fillable)) {
    entity = getFillableFields(req, fillable);
  }
  const doc = await Model.findByIdAndUpdate(req.params.id, entity, {
    new: true,
    runValidators: true
  });
  if(!doc) {
    return next(new AppError('No result found with this ID', 404));
  }
  sendResponse(res, 201, doc);
});

exports.delete = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);
  if(!doc) {
    return next(new AppError('No result found with this ID', 404));
  }
  sendResponse(res, 204);
})
