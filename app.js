const Koa =require("koa")
const bodyParser = require('koa-bodyparser');
const koajwt = require('koa-jwt')
const router = require("./routes/index")

const config = require("./config.json")

const app = new Koa()


app.use(bodyParser())


app.use((ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {code:401,mes:"login"}
    } else {
      throw err;
    }
  });
});


// 鉴权
app.use(koajwt({
  secret:config.SECRET
}).unless({
  path: [/\/register/, /\/login/]
}));


app.use(router.routes(), router.allowedMethods())

app.listen(3000, () => {
  console.log("3000")
});