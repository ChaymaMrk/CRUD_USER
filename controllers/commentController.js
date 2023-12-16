var express = require('express');
var router = express.Router();
var validation= require('../middleware/validation')
var {  findAllUsers, createUser, displayUpdateForm, updateUser, deleteUser  } = require('../services/commentService')

router.get('/', findAllUsers);
router.post('/create', validation, createUser);
router.get('/update/:id', displayUpdateForm);
router.post('/update/:id', validation,updateUser);
router.get('/delete/:id', deleteUser);

module.exports = router;
