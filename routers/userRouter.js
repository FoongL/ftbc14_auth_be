const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(userController, sampleMiddleware, basicAuth) {
    this.controller = userController;
    this.sampleMiddleware = sampleMiddleware;
    this.basicAuth = basicAuth
  }

  routes = () => {
    router.get("/firstRoute", this.controller.test);

    // router.use(this.sampleMiddleware)
    
    router.post("/basicSignUp", this.controller.signUp);
    router.post("/basicSignIn", this.controller.logIn);




    router.get("/testBasic", this.basicAuth, this.controller.test);



    router.get("/secondRoute", this.controller.test);
    router.get("/base", this.controller.baseMethod);
    router.get("/all", this.controller.getAll);
    router.get("/allItems/:id", this.controller.findOneWithItem);
    router.post("/addItem/:id", this.controller.userCreateItem);

    router.post("/newUser", this.controller.createOne);
    router.put("/test/:var", this.controller.infoPass);

    router.post("/jwtSignUp", this.controller.jwtSignUp);
    router.post("/jwtSignIn", this.controller.jwtSignIn);
    // protecting any route BELOW

    router.get("/:id", this.controller.getOne);
    // router.get
    // router.post
    // router.put
    // router.delete
    return router;
  };
}

module.exports = UserRouter;
