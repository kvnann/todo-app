var path = require('path');
var _data = require('./data');
var https = require('https');
var http = require('http');
var helpers = require('./helpers');
var url = require('url');
var _logs = require('./logs');
var util = require('util');
var debug = util.debuglog('workers');

// Instantiate the worker module object
var workers = {};
 
workers.gatherAllTodos = ()=>{
    _data.list('todos' , (err,todos)=>{
        if(!err && todos && todos.length > 0){
            todos.forEach(todo => {
                _data.read('todos' , todo.id , (err,originalTodoData)=>{
                     if(!err && originalTodoData){
                        workers.validateTodoData(originalTodoData)
                     }
                     else{
                        console.log("Could not find one of the todos, so skipping it.")
                     }
                });
            });
        }   
        else{
            debug('Error: Could not find any todo to process');
        }
    });
}


workers.validateTodoData = (todo)=>{
    todo = typeof(todo) == 'object' && todo !== null ? todo : {};
    todo.title = typeof(todo.title) == "string" && todo.title.trim().length > 0 && todo.title.trim().length <= 30 ? todo.title : false;
    todo.text = typeof(todo.text) == "string" && todo.text.trim().length > 0 && todo.text.trim().length <= 500 ? todo.text : false;
    todo.dateCreated = typeof(todo.dateCreated) == 'number' && todo.dateCreated > 0 && todo.dateCreated <= Date.now() ? todo.dateCreated : false;
    todo.deadline = typeof(todo.deadline) == 'number' && todo.deadline > Date.now() ? todo.deadline : false;
    todo.secret = typeof(todo.secret) == 'boolean' ? todo.secret : false;
    todo.password = typeof(todo.password) == 'string' && todo.password.trim().length > 0 ? todo.password : false;
    todo.dateDone = typeof(todo.dateDone) == 'number' ? todo.dateDone : false;
    todo.done = typeof(todo.done) == 'boolean' ? todo.done : false;


    if(todo.id && todo.title && todo.dateCreated){
        workers.performTodo(todo);
    } 
    else{
        debug("Error: one of the todos is not properly formatted. Skipping.");
    }
}

workers.performTodo = (todo)=>{

    var alertSent = typeof(todo.alertSent) == 'boolean' ? todo.alertSent : false;
    if(todo.deadline != "~" && todo.deadline <= Date.now() && !todo.done){

        _data.list('users',(err,users)=>{

            users.forEach((userData)=>{
                if(!err){
                    var userTodos = userData.todos;
                    userTodos.forEach((userTodo)=>{
                        if(userTodo == todo.id){
                            var userPhone = userData.phone;

                            if(!alertSent){
                                var msg = "\nYou have one uncomplated todo.\nTodo title:" + todo.title + "\nDeadline: " + new Date(todo.deadline) + "\n";
                                console.log("Message sent and todo updated successfully");
                                helpers.sendTwilioSms(userPhone,msg);
                                alertSent = true
                                todo.alertSent = alertSent;
                                _data.update('todos' , todo.id , todo , (error)=>{
                                    if(!error){
                                        console.log("Message sent and todo updated successfully" + msg);
                                    }
                                    else{
                                      console.log("Can't send message");
                                    }
                                })
                            }
                        }
                    });
                }
                else{
                  console.log("Can't list users");
                }
            });
        });
    }
    else{
        console.log("No alert needed because of " + todo.deadline +  "<" + Date.now())
    }
    workers.log(todo)
};

workers.log = function(originalTodoData){
  // Form the log data
  var logData = {
    'todo' : originalTodoData
  };

  // Convert the data to a string
  var logString = JSON.stringify(logData);

  // Determine the name of the log file
  var logFileName = originalTodoData.id;

  // Append the log string to the file
  _logs.append(logFileName,logString,function(err){
    if(!err){
      debug("Logging to file succeeded");
    } else {
      debug("Logging to file failed");
    }
  });

};

workers.loop = function(){
  setInterval(function(){
    workers.gatherAllTodos();
  },1000 * 60);
};


workers.rotateLogs = function(){
  _logs.list(false,function(err,logs){
    if(!err && logs && logs.length > 0){
      logs.forEach(function(logName){
        // Compress the data to a different file
        var logId = logName.replace('.log','');
        var newFileId = logId+'-'+Date.now();
        _logs.compress(logId,newFileId,function(err){
          if(!err){
            // Truncate the log
            _logs.truncate(logId,function(err){
              if(!err){
                debug("Success truncating logfile");
              } else {
                debug("Error truncating logfile");
              }
            });
          } else {
            debug("Error compressing one of the log files.",err);
          }
        });
      });
    } else {
      debug('Error: Could not find any logs to rotate');
    }
  });
};

workers.logRotationLoop = function(){
  setInterval(function(){
    workers.rotateLogs();
  },1000 * 60 * 60 * 24);
}


workers.init = function(){
  // Send to console, in yellow
  console.log('\x1b[33m%s\x1b[0m','Background workers are running');

  // Execute all the todo immediately
  workers.gatherAllTodos();

  // Call the loop so the todo will execute later on
  workers.loop();

  // Compress all the logs immediately
  workers.rotateLogs();

  // Call the compression loop so todo will execute later on
  workers.logRotationLoop();

};


module.exports = workers