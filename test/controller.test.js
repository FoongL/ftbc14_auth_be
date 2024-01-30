// // Get all imported packages and modules
// const chai = require("chai");
// const sinon = require("sinon");
// const sinonChai = require("sinon-chai");
// const sequelize = require("sequelize");
// const db = require("../db/models/index");

// // Set up the fruit model, setup chai assertion
// const { user } = db;
// const expect = chai.expect;

// // Tell chai to use sinonChai
// chai.use(sinonChai);

// // Start to write our testing environment
// describe("User Controller tests", async () => {
//   // Set up the sandbox using sinon so that we can keep tests seperate
//   const sandbox = sinon.createSandbox();
//   // Set up required variables
//   let sampleReturnedUserList, req, res, UserController, userController;

//   // before we run the test we will run this block
//   beforeEach(() => {
//     // define the fruit Controller that we will be testing
//     UserController = require("../controller/userController");
//     userController = new UserController(user);
//     // define the sample data we will run through the controller methods
//     sampleReturnedUserList = [
//       {
//         id: 1,
//         email: "bob@bob.com",
//         fullName: "Bobby Robers",
//         age: 34,
//         gender: "male",
//         password: "password123",
//       },
//       {
//         id: 2,
//         email: "jane@jane.com",
//         fullName: "jane  Robers",
//         age: 34,
//         gender: "male",
//         password: "password123",
//       },
//     ];
//     // develop a mock request
//     req = {};
//     // develop a mock response
//     mockResponse = () => {
//       const res = {};
//       res.status = sinon.stub().returns(res);
//       res.json = sinon.stub().returns(res);
//       return res;
//     };
//     res = mockResponse();
//   });

//   // This block runs after each test is run
//   afterEach(() => {
//     // restore all stubbed functions and the sand box
//     sinon.restore();
//     sandbox.restore();
//   });
//   describe("List function", async () => {
//     // write out the what we are testing for
//     it("Can calls the findAll method to get the data from the database", async () => {
//       // Create a stub for the findAll method from sequelize, it resolves the sample data above
//       let findAllStub = sandbox
//         .stub(sequelize.Model, "findAll")
//         .resolves(sampleReturnedUserList);

//       // call the controller mehtod
//       await userController.getAll(req, res);
//       // set up the assertions
//       expect(findAllStub.calledOnce).to.be.true;
//       expect(res.json.calledOnce).to.be.true;
//       expect(res.status.calledOnce).to.be.false;
//       expect(res.json).to.be.calledWith({
//         data: sampleReturnedUserList,
//         success: true,
//       });
//     });
//   });
//   describe("POST into user Router", () => {
//     it("inserting one through jwt signup", async () => {
//         const samplePostReturn={
//             userId: 1
//         }
//       let postStub = sandbox
//         .stub(sequelize.Model, "create")
//         .resolves(samplePostReturn);

//       // call the controller mehtod
//       req.body = {
//         email: "test@test.com",
//         fullName: "tester 1",
//         age: 25,
//         gender: "female",
//         password: "testtesttesttest",
//       };
//       const testResponse = await userController.jwtSignUp(req, res);

//     //   console.log('test response:', testResponse.json, res.json())
//     //   console.log('res.json.calledOnce', postStub.calledOnce)
//       // set up the assertions
//       expect(postStub.calledOnce).to.be.true;
//       expect(res.json.calledOnce).to.be.true;
//       expect(res.json).to.be.calledWithMatch({
//         success: true,
//       });
//     });
//   });
// });
