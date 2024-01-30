const bcrypt = require("bcrypt");

const basicAuth = (users) => async (req, res, next) => {
  const dataString = req.headers.authorization.split(" ")[1]; // "Basic email:password"
  const authData = Buffer.from(dataString, "base64").toString();

  const [email, password] = authData.split(":");

  console.log('in the middleware')
  console.log({email, password})

  const user = await users.findOne({where:{email}})

  console.log('user:', user)
  if (!user) {
    return res.status(404).json({ success: false, msg: "user not found" });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    return res
      .status(403)
      .json({ success: false, msg: "password incorrect" });
  }

  console.log({passwordCompare})

  next()
};


module.exports = basicAuth