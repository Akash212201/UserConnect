
const Auth = async(req,res,next) => {
  try {
    const token =req.headers.authorization.split(" ")[1];
    res.json(token);

  } catch (error) {
    return res.status(401).send({error: "Authorization failed."});
  }
}
exports.localVariables = async(req,res,next) => {
  req.app.locals={
    OTP: null,
    resetsession: false
  }
  next();
}
module.exports=Auth;
