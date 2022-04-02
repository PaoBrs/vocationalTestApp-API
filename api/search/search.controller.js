const { ObjectId } = require('mongoose').Types;
const University = require('../universities/universities.model');
const User = require('../users/users.model');
const Billing = require('../billings/billings.model');
const {
  searchUsers,
  searchUniversities,
  searchBilling,
} = require('./search.service');

const handlerUsersSearch = async (req, res) => {
  const { query } = req.params;
  const { limit = 5, page = 1 } = req.query;

  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    const user = await User.findById(query).populate('university', 'name');
    return res.json({
      totalDocs: user ? 1 : 0,
      currentPage: 1,
      totalPages: 1,
      results: user ? [user] : [],
    });
  }

  const { total, users } = await searchUsers(query, limit, page);

  return res.json({
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: users,
  });
};

const handlerUniversitiesSearch = async (req, res) => {
  const { query } = req.params;
  const { limit = 5, page = 1 } = req.query;

  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    const university = await University.findById(query);
    return res.json({
      totalDocs: university ? 1 : 0,
      currentPage: 1,
      totalPages: 1,
      results: university ? [university] : [],
    });
  }

  const { total, universities } = await searchUniversities(query, limit, page);

  return res.json({
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: universities,
  });
};

const handlerCareersSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerCareersSearch' });
};

const handlerQuestionsSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerQuestionsSearch' });
};

const handlerTestsSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerTestsSearch' });
};

const handlerBillingsSearch = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  const { query } = req.params;

  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    let billing = await Billing.findById(query)
      .populate('user', 'names email');

    if (billing) {
      return res.json({
        totalDocs: 1,
        currentPage: 1,
        totalPages: 1,
        results: [billing],
      });
    }
    const total = await Billing.countDocuments({ user: { _id: query } });
    billing = await Billing.find({ user: { _id: query } })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('user', 'names email');

    return res.json({
      totalDocs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      results: billing,
    });
  }

  if (!Number.isNaN(Number(query))) {
    const billing = await Billing.find({ transactionNumber: Number(query) })
      .populate('user', 'names email');
    return res.json({
      totalDocs: billing ? 1 : 0,
      currentPage: 1,
      totalPages: 1,
      results: billing,
    });
  }

  const { total, billings } = await searchBilling(query, limit, page);

  return res.json({
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: billings,
  });
};

const handlerOffersSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerOffersSearch' });
};

const handlerResultsSearch = async (req, res) => {
  const { query } = req.params;

  res.json({ msg: 'handlerResultsSearch' });
};

module.exports = {
  handlerUsersSearch,
  handlerUniversitiesSearch,
  handlerCareersSearch,
  handlerQuestionsSearch,
  handlerTestsSearch,
  handlerBillingsSearch,
  handlerOffersSearch,
  handlerResultsSearch,
};