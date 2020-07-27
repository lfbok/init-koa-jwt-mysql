exports.register = async ctx =>{
  console.log(ctx.request.body)
  ctx.body = ctx
}

exports.userInfo = async  ctx => {
  console.log(ctx.state)
}