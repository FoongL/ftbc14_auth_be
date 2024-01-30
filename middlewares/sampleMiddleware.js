const sampleMiddleware = (req, res, next) => {

  console.log("I am in the middleware");
//   console.log("req:", req);
//   res.status(409).json({success: false, msg:'middleware has intercepted this'})
  next();
};

module.exports = sampleMiddleware