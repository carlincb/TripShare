const User = require('./User');
const Blog = require('./Blog');
const Upvotes = require('./Upvotes');
const Comment = require('./Comment')

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Blog, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(Upvotes, {
  foreignKey: 'votes_id',
  onDelete: 'CASCADE'
});

Upvotes.hasOne(Blog, {
  foreignKey: 'votes_id',
  onDelete: 'CASCADE'
});


module.exports = { User, Blog, Comment, Upvotes };
