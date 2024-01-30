class BaseController {
  constructor(model) {
    this.model = model;
  }

  baseMethod = (req, res) => {
    return res.send("This is my base controller");
  };

  getAll = async (req, res) => {
    const output = await this.model.findAll();
    return res.json({ success: true, data: output });
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    const output = await this.model.findByPk(id);
    if (!output) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }
    return res.json({ success: true, data: output });
  };

  createOne = async (req, res) => {
    // email, fullname, age, gender
    const { email, fullName, age, gender } = req.body;
    // input balidation

    if (!email || !fullName || !age || !gender) {
      return res
        .status(400)
        .json({ success: false, msg: "you suck at inputting" });
    }

    try {
      const newUser = await this.model.create({
        email,
        fullName,
        age,
        gender,
      });

      console.log("new user", newUser);

      return res.json({ success: true, user: newUser });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };
  infoPass = async (req, res) => {
    console.log(req);
    return res.json({ params: req.params, body: req.body, query: req.query });
  };

  basicTest = async (req, res) => {
    console.log('in my controller:',req.userId)
    return res.json({ success: true, msg: "you got me" });
  };
}

module.exports = BaseController;
