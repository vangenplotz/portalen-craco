const proxy = require('http-proxy-middleware')

const target = process.env.REACT_APP_LIVEURL || 'https://portalen-craco.gerhardsletten.now.sh'

module.exports = function(app) {
  app.use('/apitest', function(req, res, next) {
    res.json({
      message: 'debug',
      target
    })
  })
  app.use(
    proxy('/api', {
      target: target,
      changeOrigin: true
    })
  )
}
