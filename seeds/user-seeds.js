const { User } = require('../models');

const userData = [
    {
       username: 'testUser',
       password: 'password123', 
    },
    {
       username: 'testUser2',
       password: 'password123', 
    },
    {
       username: 'testUser3',
       password: 'password123', 
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;