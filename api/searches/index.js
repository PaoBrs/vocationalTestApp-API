const { Router } = require('express');
const { validateJwtMw, isAdminRoleMw } = require('../../middlewares');

const {
  handlerUsersSearch,
  handlerUniversitiesSearch,
  handlerCareersSearch,
  handlerQuestionsSearch,
  handlerTestsSearch,
  handlerBillingsSearch,
  handlerOffersSearch,
  handlerResultsSearch,
  handlerQuestionResponseSearch,
} = require('./search.controller');

const router = Router();

router.get('/users/:query', [
  validateJwtMw,
  isAdminRoleMw,
], handlerUsersSearch);

router.get('/universities', [
], handlerUniversitiesSearch);

router.get('/careers/:query', [
], handlerCareersSearch);

router.get('/offers/:query', [
], handlerOffersSearch);

router.get('/questions/:query', [
], handlerQuestionsSearch);

router.get('/tests/:query', [
], handlerTestsSearch);

router.get('/billings/:query', [
  validateJwtMw,
], handlerBillingsSearch);

router.get('/results/:query', [
  validateJwtMw,
], handlerResultsSearch);

router.get('/questionResponse/:query', [
  validateJwtMw,
], handlerQuestionResponseSearch);

module.exports = router;
