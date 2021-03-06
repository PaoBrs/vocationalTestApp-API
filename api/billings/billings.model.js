const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BillingSchema = new mongoose.Schema({
  transactionNumber: {
    type: Number,
    unique: true,
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  taxes: {
    type: Number,
    default: 0,
  },
  fees: {
    type: Number,
    default: 0,
  },
  paymentMethod: {
    type: String,
    enum: ['CREDIT CARD', 'DEBIT CARD', 'PAYPAL'],
    default: 'PAYPAL',
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  condition: {
    type: String,
    enum: ['COMPLETED', 'REFUNDED'],
    default: 'COMPLETED',
  },
}, {
  timestamps: true,
});

BillingSchema.plugin(AutoIncrement, { inc_field: 'transactionNumber' });

BillingSchema.methods.toJSON = function () {
  const billing = this;
  /* eslint-disable */
  const { _id, __v, state, user, ...rest } = billing.toObject();
  rest.id = _id;
  user.uid = user._id;
  delete (user._id)
  rest.user = user
  /* eslint-enable */

  return rest;
};

module.exports = mongoose.model('Billing', BillingSchema);
