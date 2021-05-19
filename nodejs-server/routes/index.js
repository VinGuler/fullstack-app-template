const fs = require('fs')

const initializeAppRoutes = function (app, db, { staticFolder }) {
  app.get('/get-user', (req, res) => {
    res.json({
      username: 'VinGuler'
    })
  })

  app.post('/post-data', (req, res) => {
    const filenames = fs.readdirSync(staticFolder)
    const filteredFiles = filenames.filter((filename) => !filename.includes('html') && !filename.includes('js') && !filename.includes('css'))
    res.json(filteredFiles)
  })
}

exports.initializeAppRoutes = initializeAppRoutes
