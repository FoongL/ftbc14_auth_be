const BaseController = require("./baseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController extends BaseController {
  constructor(model, items) {
    super(model);
    this.items = items;
  }

  test = (req, res) => {
    console.log(req.headers);
    // I can do what i want in here

    /**
     * connect DB
     * third part API calls
     * Calculations
     *
     */
    return res.send("I am in my User Controller");
  };

  findOneWithItem = async (req, res) => {
    const { id } = req.params;

    // lazy loading method
    const lazyUser = await this.model.findByPk(id);
    const usersItems = await lazyUser.getItems();

    // eager loading method
    const eagerUser = await this.model.findOne({
      where: { id },
      include: { model: this.items },
    });
    return res.json({
      success: true,
      lazy: { user: lazyUser, items: usersItems },
      eager: eagerUser,
    });
  };

  userCreateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const user = await this.model.findByPk(id);
    await user.createItem({ name, description });

    return res.json({ success: true, user });
  };

  signUp = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing info you numpty" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.model.create({
      email,
      password: hashedPassword,
      gender:'other',
      fullName:'John Doe'
    });

    return res.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  };

  logIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing info you numpty" });
    }

    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res
        .status(403)
        .json({ success: false, msg: "password incorrect" });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  };

  basicSignIn = async (req, res) => {
    const { email, password } = req.body;
    // data validation to confirm i have everything
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing basic information" });
    }

    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }

    const compare = await bcrypt.compare(password, user.password); // true or false

    if (!compare) {
      return res
        .status(403)
        .json({ success: false, msg: "password does not match" });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.fullName,
      },
    });
  };

  basicSignUp = async (req, res) => {
    const { email, fullName, age, gender, password } = req.body;

    // data validation to confirm i have everything
    if (!email || !fullName || !gender || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing basic information" });
    }

    // hashpassword

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.model.create({
      email,
      fullName,
      age,
      gender,
      password: hashedPassword,
    });

    return res.json({
      success: true,
      user: {
        id: newUser.id,
        fullName,
      },
    });
  };

  jwtSignUp = async (req, res) => {
    const { email, fullName, age, gender, password } = req.body;

    // data validation to confirm i have everything
    if (!email || !fullName || !gender || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing basic information" });
    }

    // hashpassword

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.model.create({
      email,
      fullName,
      age,
      gender,
      password: hashedPassword,
    });

    const payload = {
      id: newUser.id,
      email,
      gender,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5mins",
    });

    return res.json({ success: true, token });
  };

  jwtSignIn = async (req, res) => {
    const { email, password } = req.body;
    // data validation to confirm i have everything
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing basic information" });
    }

    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }

    const compare = await bcrypt.compare(password, user.password); // true or false

    if (!compare) {
      return res
        .status(403)
        .json({ success: false, msg: "password does not match" });
    }

    const payload = {
      id: user.id,
      email,
      gender: user.gender,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5mins",
    });
    return res.json({ success: true, token });
  };
}

module.exports = UserController;
