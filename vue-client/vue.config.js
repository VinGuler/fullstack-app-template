const path = require('path')

// let PORT = 8080
// try {
//   const config = require('../config')
//   PORT = config['client-port'] || PORT
// } catch (error) {
//   console.warn('Error requiring config file')
// }
// console.log(`CLIENT PORT SET TO ${PORT}`)

module.exports = {
  // Build export is the `public` folder in the server
  outputDir: path.resolve(__dirname, '../server/public'),
  // devServer: {
  //   proxy: {
  //     '^/ws': {
  //       target: 'ws://localhost:3000',
  //       ws: true,
  //       changeOrigin: true
  //     },
  //     '^/api': {
  //       target: 'http://localhost:3000',
  //       ws: false,
  //       changeOrigin: true
  //     }
  //   }
  // }
}
