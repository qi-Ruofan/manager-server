const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./utils/log4j')
const users = require('./routes/users')
const router = require('koa-router')()
// var log = log4js.getLogger()

// error handler
onerror(app)

require('./config/db')
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// app.use(() => {
//   ctx.body = 'hello'
// })
// logger
app.use(async (ctx, next) => {
  log4js.info(`params:${ctx.request.query || ctx.request.body}`)
  await next()
})

router.prefix("/api")
router.use(users.routes(), users.allowedMethods())
// routes
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
  log4js.error(err.stack)
});

module.exports = app
