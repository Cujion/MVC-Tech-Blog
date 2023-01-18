const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    
});

Post.hasMany(Comment, {

});

User.hasMany(Comment, {

});

Post.belongsTo(User, {

});

Comment.belongsTo(User, {

});


module.exports = { User, Post, Comment }