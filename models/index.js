const User = require('./User');
const Post = require('./Project');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany( Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany( Comment, {
  foreignKey: 'Post_id'
})

Comment.belongsTo( User, {
  foreignKey: 'user_id'
})

Comment.belongsTo( Post, {
  foreignKey:'Post_id'
})

module.exports = { User, Post , Comment };