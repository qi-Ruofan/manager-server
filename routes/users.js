/**
 * 用户管理模块
 */

const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/utils')
const log4js = require('./../utils/log4j')

router.prefix('/users')
router.post('/login', async (ctx) => {
  try {
    const {userName, userPwd} = ctx.request.body
    const res = await User.findOne({
      userName,
      userPwd
    })
    if(res) {
      log4js.debug(res._doc)
      ctx.body = util.success(res._doc)
    } else {
      ctx.body = util.fail("账号或密码不正确")
    }
  } catch(error) {
    log4js.debug(error)
    ctx.body = util.fail(error.msg)
  }

})

module.exports = router
