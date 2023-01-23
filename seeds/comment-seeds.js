const { Comment } = require('../models');

const commentData = [
    {
        comment_content: 'Hello this is a new comment 1',
        user_id: 1,
        post_id: 1
    },
    {
        comment_content: 'Hello this is a new comment 2',
        user_id: 1,
        post_id: 1
    },
    {
        comment_content: 'Hello this is a new comment 3',
        user_id: 2,
        post_id: 1
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments