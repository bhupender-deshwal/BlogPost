const express = require('express');
const {register,login,logout}= require('../controllers/auth')

const Router = express.Router()

Router.post('/register',register)
Router.post('/login',login)
Router.post('/logout',logout)

module.exports = Router;