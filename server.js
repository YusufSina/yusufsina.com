const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

// Increase Node.js memory limit for WebAssembly
if (!process.env.NODE_OPTIONS) {
  process.env.NODE_OPTIONS = '--max-old-space-size=4096'
}

const app = next({ 
  dev, 
  hostname, 
  port,
  // Disable webpack cache to reduce memory usage
  conf: {
    webpack: (config) => {
      config.cache = false
      return config
    }
  }
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})

