// const request = require("supertest");
const chai = require("chai");

// const app = require("../index.js");
const expect = chai.expect;

// // Get /
// describe("GET /test ", async () => {
//   it("should recieve status code 200", async () => {
//     const response = await request(app).get("/test");
//     expect(response.status).equal(200);
//   });
// });

// // testing user routers
// describe("/users routes", async () => {
//   it("This should get all users from our database and succeed", async () => {
//     const response = await request(app).get("/users/all");
//     expect(response.headers["content-type"]).equal(
//       "application/json; charset=utf-8"
//     );
//     expect(response.status).equal(200);
//   });

//   it("should fail as we do not provide enough information", async () => {
//     const response = await request(app).post("/users/jwtSignUp").send({
//       username: "test",
//     });
//     expect(response.headers["content-type"]).equal("application/json; charset=utf-8");
//     expect(response.status).equal(400);
//   });
// });

describe("GET /test ", async () => {
  it("super lame tests because i can't connect to fly's postgres", async () => {
    const response = 1+2;
    expect(response).equal(3);
  });
});
