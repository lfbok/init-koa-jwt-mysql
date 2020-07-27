const db = require("./index")
const Sequelize = require('sequelize');

const User = db.define('user', {
  name:{
    type: Sequelize.STRING,
    allowNull: false //允许null
  },
  user_id:{
    type: Sequelize.STRING(16),
    allowNull: false 
  },
  account:{
    type: Sequelize.STRING,
    allowNull: false 
  },
  pass:{
    type: Sequelize.STRING,
    allowNull: false 
  }
}, {
  // 参数
});
// User.sync({ force: true });
module.exports = User