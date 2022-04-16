const { Router } = require('express');
const { check } = require('express-validator');
const { validateJwtMw } = require('../../middlewares');
const { handlerGoogleLogin } = require('./google.controller');

const router = Router();

router.post('/', [
], handlerGoogleLogin);

module.exports = router;
