const Router = require("koa-router")
const user = require("../controllers/user")
const router = new Router();

module.exports = router.post("/register", user.register)
.get("/user-info",user.userInfo)