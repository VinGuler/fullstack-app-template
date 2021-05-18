const fs = require('fs')

const initializeAppRoutes = function (app, db, { staticFolder }) {
  app.get('/get-data', (req, res) => {
    const filenames = fs.readdirSync(staticFolder)
    const filteredFiles = filenames.filter((filename) => !filename.includes('html') && !filename.includes('js') && !filename.includes('css'))
    res.json(filteredFiles)
  })

  app.post('/post-data', (req, res) => {
    const filenames = fs.readdirSync(staticFolder)
    const filteredFiles = filenames.filter((filename) => !filename.includes('html') && !filename.includes('js') && !filename.includes('css'))
    res.json(filteredFiles)
  })
}

exports.initializeAppRoutes = initializeAppRoutes
