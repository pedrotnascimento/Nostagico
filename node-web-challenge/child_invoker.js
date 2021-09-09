var spawn = require('child_process').spawn
var path  = require('path');

var process = spawn('python', [path.join(__dirname,'solver.py'),
                                "hello world"]);
                                
process.stdout.on('data', function(data){
        console.log(data);
        console.log(data.toString());
});