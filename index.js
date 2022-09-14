var app = {};
var server = require('./lib/server');
const workers = require('./lib/workers');


app.init = ()=>{
    server.init();
    //workers.init();
}

app.init();


module.exports = app;