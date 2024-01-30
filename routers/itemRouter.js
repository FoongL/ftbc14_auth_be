const express = require("express");
const router = express.Router();

class ItemRouter {
  constructor(itemController) {
    this.controller = itemController;
  }

  routes = () => {
    router.get("/firstRoute", this.controller.test);
    router.get('/base', this.controller.baseMethod)
    router.get('/emAll/:name', this.controller.pokemon)
    router.post('/newItem', this.controller.createOne)
    router.put('/itemCat', this.controller.associateItems)
    router.get('/:id', this.controller.getItemsWithCat)
    // router.get
    // router.post
    // router.put
    // router.delete
    return router;
  };
}

module.exports = ItemRouter;
