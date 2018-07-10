'use strict'

var glob = require('glob')
var castArray = require('cast-array')
var seneca = require('seneca')()
var colors = require('colors')

exports.plugin = {
  register: (server, options) => {
    var globOptions = {
      nodir: true,
      strict: true,
      cwd: options.cwd || process.cwd(),
      ignore: options.ignore
    }

    seneca.act_sync = function (...args) {
      return new Promise(function (resolve, reject) {
        seneca.act(...args, function (err, response) {
          if (err) { return reject(err) }
          resolve(response)
        })
      })
    }

    server.decorate('toolkit', 'seneca', seneca)

    castArray(options.path).forEach(function (pattern) {
      var files = glob.sync(pattern, globOptions)

      files.forEach(function (file) {
        seneca.use(globOptions.cwd + '/' + file)
        console.log(`seneca [${file.substring(0, file.lastIndexOf('.'))}] load success.`.green)
      })
    })
  },

  pkg: require('../package.json')
}
