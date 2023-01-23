const { Post } = require('../models');

const postData = [
    {
       title: 'new post',
       content: 'this is a new post',
       user_id: 1 
    },
    {
       title: 'new post 2',
       content: 'this is a new post 2',
       user_id: 1 
    },
    {
       title: 'new post 3',
       content: 'this is a new post 3',
       user_id: 2 
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost