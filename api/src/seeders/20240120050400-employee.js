"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

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
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash("password", salt);
    const employees = [
      {
        id: 1,
        firstName: "Imron",
        lastName: "Rosdiana",
        email: "imron@examples.com",
        phoneNumber: "08979127446",
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    for (let i = 1; i <= 100; i++) {
      employees.push({
        id: i + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number("08##########"),
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    // insert the users into the database
    await queryInterface.bulkInsert("employees", employees);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("employees", null, {});
  },
};
