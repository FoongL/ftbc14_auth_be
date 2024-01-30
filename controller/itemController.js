const BaseController = require("./baseController");
const axios = require("axios");

class ItemController extends BaseController {
  constructor(model, category) {
    super(model);
    this.category = category
  }

  test = (req, res) => {
    return res.send("I am in my Items Controller");
  };

  pokemon = async (req, res) => {
    console.log(req.params);
    const { name } = req.params;
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const pokeData = await axios.get(url);
    console.log("I GOT THE DATA!");

    return res.json({ data: pokeData.data });
  };

  createOne = async (req, res) => {
    const { name, description, userId } = req.body;

    try {
      const newItem = await this.model.create({
        name,
        description,
        userId,
      });

      console.log("new user", newItem);

      return res.json({ success: true, item: newItem });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };

  associateItems = async(req, res)=>{
    const {itemId, categoryId} = req.body

    const item = await this.model.findByPk(itemId)
    const category = await this.category.findByPk(categoryId)

    await item.setCategories(category)

    return res.json({success:true, item, category})
  }

  getItemsWithCat = async(req,res)=>{
    const {id} = req.params

    const item = await this.model.findOne({where:{id}, include: this.category})

    return res.json({success:true, item})
  }
}

module.exports = ItemController;
