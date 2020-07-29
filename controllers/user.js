const userDb = require("../db/user");
const { v4 } = require("uuid");
const md5 = require("md5");
const jsonwebtoken = require("jsonwebtoken")
const {SECRET} = require("../config.json")

exports.register = async (ctx) => {
  const { account, password, name } = ctx.request.body;
  if (!account || !password || !name) return (ctx.body = { mes: "必填！" });
  const oldUser = await userDb.findAll({
    where: {
      account,
    },
  });
  if (oldUser.length) {
    return (ctx.body = {
      msg: "账户已存在!",
    });
  }
  const oldName = await userDb.findAll({
    where: {
      name,
    },
  });
  if (oldName.length) {
    return (ctx.body = {
      msg: "昵称已被使用!",
    });
  }
  const newUser = {
    name,
    account,
    pass: md5(password),
    user_id: v4(),
  };
  await userDb.create(newUser);
  ctx.body = {
    msg: "注册成功！",
  };
};
exports.login = async (ctx) => {
  const { account, password } = ctx.request.body;
  if (!account || !password) return (ctx.body = { mes: "必填！" });
  const pass = md5(password);
  const oldUser = await userDb.findOne({
    where: {
      account,
      pass,
    },
  });
  if (oldUser) {
    const token = jsonwebtoken.sign(
      {uid:oldUser.user_id}, // 加密userToken, 等同于上面解密的userToken
      SECRET,
      { expiresIn: 60 } // 有效时长1小时
    );
    ctx.body = {
      code: 200,
      token,
      msg: "登录成功！",
    };
  } else {
    ctx.body = {
      msg: "账号或密码错误！",
    };
  }
};
exports.info = async (ctx) => {
  const userInfo = await userDb.findOne({
    where: {
      user_id:ctx.state.user.uid,
    },
  });
  ctx.body = {
    msg:"ok",
    data:userInfo
  }
};