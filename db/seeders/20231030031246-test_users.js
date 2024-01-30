"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("users", [
      {
        email: "foong@rocketacademy.co",
        full_name: "Foong Leung",
        age: 33,
        gender: "male",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "samo@rocketacademy.co",
        full_name: "Sam O",
        age: 21,
        gender: "male",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null);
  },
};
