const users = require('../api/users');
const universities = require('../api/universities');
const localAuth = require('../auth/local');
const googleAuth = require('../auth/google');
const search = require('../api/searches');
const billings = require('../api/billings');
const testResults = require('../api/testResults');
const offers = require('../api/offers');
const careers = require('../api/careers');
const questions = require('../api/questions');
const vocationalTest = require('../api/vocationalTest');
const questionResponse = require('../api/questionResponse');
const checkout = require('../api/checkout');
const admin = require('../api/admin');

function routes(app) {
  app.use('/api/careers', careers);
  app.use('/api/offers', offers);
  app.use('/api/universities', universities);
  app.use('/api/users', users);
  app.use('/api/questions', questions);
  app.use('/api/tests', vocationalTest);
  app.use('/api/results', testResults);
  app.use('/api/responses', questionResponse);
  app.use('/api/testresults', testResults);
  app.use('/api/billings', billings);
  app.use('/api/search', search);
  app.use('/auth/local/login', localAuth);
  app.use('/auth/google/login', googleAuth);
  app.use('/api/checkout', checkout);
  app.use('/api/admin', admin);
}

module.exports = routes;
