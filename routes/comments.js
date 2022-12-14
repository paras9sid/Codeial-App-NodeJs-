const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportlocal = require('../config/passport-local-strategy');

const commentsController = require('../controllers/comments_controller');

//second level of Authentication , so nobody can tamper with inspect element and spam the page , only signed user can post 
// checkAuthentication method is used -- authentication method creating problem check again
router.post('/create',commentsController.create);

router.get('/destroy/:id',commentsController.destory);

module.exports = router;