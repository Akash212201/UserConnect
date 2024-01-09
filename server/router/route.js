const express = require('express');
const app=express()
const router = express.Router();
const { verifyUser,login, register,getUser,updateUser,generateOTP,varifyOTP,createResetSession,resetPassword } = require('../controllers/controller.js');
const Auth = require('../auth.js');
const {localVariables} = require('../auth.js');
const {registerMail} = require('../controllers/mail.js');
app.use(express.json());
router.route('/register').post(register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(verifyUser,(req,res) =>res.end());
router.route('/login').post(verifyUser,login);

router.route('/user/:username').get(getUser);
// router.route('/generateOtp').get(verifyUser,localVariables,generateOTP);
router.route('/VarifyOTP').get(verifyUser,varifyOTP);
router.route('/createResetSession').get(createResetSession);

router.route('/updateuser').put(Auth,updateUser);
router.route('/resetPassword').put(verifyUser,resetPassword);


module.exports = router;

