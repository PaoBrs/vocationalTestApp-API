const mongoose = require('mongoose');

const TestResultsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  description: {
    type: String,
    default: '',
  },
  careers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
  }],
  state: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

TestResultsSchema.methods.toJSON = function () {
  const testResult = this;
  const { _id, __v, state, ...rest } = testResult.toObject();
  rest.id = _id;

  return rest;
};

module.exports = mongoose.model('TestResult', TestResultsSchema);
