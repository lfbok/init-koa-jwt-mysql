const Router = require("koa-router")
const user = require("../controllers/user")
const router = new Router();

router
.post("/register", user.register)
.post("/login", user.login)
.get("/info",user.info)

module.exports = router