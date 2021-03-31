const chokidar = require('chokidar')
const exec = require('child_process').exec

chokidar.watch('.').on('all', (event, path) => {
  console.log(event, path)
  exec('sh shell.sh', function (error) {
    if (error) {
      console.log(error)
    }
  })
})
