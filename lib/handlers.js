const lib = require('./data');
var _data = require('./data')
var helpers = require("./helpers")
var handlers = {};

// Index
handlers.index = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      "":""
    };

    // Read in a template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
        
        // Add the universal header and footer
          callback(200,str,'html');
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};
// Create New Session
handlers.home = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      "":""
    };
    // Read in a template as a string
    helpers.getTemplate('home',templateData,function(err,str){
      if(!err && str){
        str = helpers.interpolate(str,templateData);
        callback(200,str,'html')
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit Your Account
handlers.accountEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      "":""
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if(!err && str){
            callback(200,str,'html');
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      "":""
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
            // Return that page as HTML
            callback(200,str,'html');
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      "":""
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};


// Create a new todo
handlers.todosCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      "":""
    };
    // Read in a template as a string
    helpers.getTemplate('todosCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
            callback(200,str,'html');
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Dashboard (view all todos)
handlers.todosList = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      "":""
    };
    // Read in a template as a string
    helpers.getTemplate('todosList',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit a todo
handlers.todosEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      "":""
    };
    // Read in a template as a string
    helpers.getTemplate('todosEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
            // Return that page as HTML
            callback(200,str,'html');
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Favicon
handlers.favicon = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico',function(err,data){
      if(!err && data){
        // Callback the data
        callback(200,data,'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public assets
handlers.public = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
        if(!err && data){

          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }

          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }

          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }

          // Callback the data
          callback(200,data,contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }

  } else {
    callback(405);
  }
};



handlers.ping = function(data,callback){
    callback(200);
};

handlers.notFound = function(data,callback){
    callback(404);
  };

handlers.users = (data,callback)=>{
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
}


handlers._users = {}

handlers._users.post = (data,callback)=>{
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;
  var fileName = phone;

  if(firstName && lastName && phone && password && tosAgreement){
    // Make sure the user doesn't already exist
    _data.read('users',phone,function(err,data){
      if(err){
        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if(hashedPassword){
          var userObject = {
            'fileName' : fileName,
            'firstName' : firstName,
            'lastName' : lastName,
            'phone' : phone,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true
          };

          // Store the user
          _data.create('users',userObject,function(err){
            if(!err){
              callback(200);
            } else {
              callback(500,{'Error' : 'Could not create the new user'});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not hash the user\'s password.'});
        }

      } else {
        // User alread exists
        callback(400,{'Error' : 'A user with that phone number already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }

}


handlers._users.get = (data,callback)=>{
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',phone,function(err,data){
          if(!err && data){
            // Remove the hashed password from the user user object before returning it to the requester
            delete data.hashedPassword;
            callback(200,data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."})
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
}


handlers._users.put = function(data,callback){
  // todo for required field
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // todo for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  // Error if phone is invalid
  if(phone){
    // Error if nothing is sent to update
    if(firstName || lastName || password){

      // Get token from headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

      handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if(tokenIsValid){

          // Lookup the user
          _data.read('users',phone,function(err,userData){
            if(!err && userData){
              // Update the fields if necessary
              if(firstName){
                userData.firstName = firstName;
              }
              if(lastName){
                userData.lastName = lastName;
              }
              if(password){
                userData.hashedPassword = helpers.hash(password);
              }
              // Store the new updates
              _data.update('users',phone,userData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the user.'});
                }
              });
            } else {
              callback(400,{'Error' : 'Specified user does not exist.'});
            }
          });
        } else {
          callback(403,{"Error" : "Missing required token in header, or token is invalid."});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }

};

// Required data: phone
// Cleanup old todos associated with the user
handlers._users.delete = function(data,callback){
  // todo that phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',phone,function(err,userData){
          if(!err && userData){
            // Delete the user's data
            _data.delete('users',phone,function(err){
              if(!err){
                // Delete each of the todos associated with the user
                var userTodos = typeof(userData.todos) == 'object' && userData.todos instanceof Array ? userData.todos : [];
                var todosToDelete = userTodos.length;
                if(todosToDelete > 0){
                  var todosDeleted = 0;
                  var deletionErrors = false;
                  // Loop through the todos
                  userTodos.forEach(function(todoId){
                    // Delete the todo
                    _data.delete('todos',todoId,function(err){
                      if(err){
                        deletionErrors = true;
                      }
                      todosDeleted++;
                      if(todosDeleted == todosToDelete){
                        if(!deletionErrors){
                          callback(200);
                        } else {
                          callback(500,{'Error' : "Errors encountered while attempting to delete all of the user's todos. All todos may not have been deleted from the system successfully."})
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500,{'Error' : 'Could not delete the specified user'});
              }
            });
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};


handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

handlers._tokens  = {};

handlers._tokens.post = function(data,callback){
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if(phone && password){
    // Lookup the user who matches that phone number
    _data.read('users',phone,function(err,userData){
      if(!err && userData){
        // Hash the sent password, and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          // If valid, create a new token with a random name. Set an expiration date 1 hour in the future.
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'fileName' : tokenId,
            'phone' : phone,
            'id' : tokenId,
            'expires' : expires
          };

          // Store the token
          _data.create('tokens',tokenObject,function(err){
            if(!err){
              callback(200,tokenObject);
            } else {
              callback(500,{'Error' : 'Could not create the new token'});
            }
          });
        } else {
          callback(400,{'Error' : 'Password did not match the specified user\'s stored password'});
        }
      } else {
        callback(400,{'Error' : 'Could not find the specified user.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field(s)..'})
  }
};


handlers._tokens.get = function(data,callback){
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
            callback(200,tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

handlers._tokens.put = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if(id && extend){
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        if(tokenData.expires > Date.now()){
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          _data.update('tokens',id,tokenData,function(err){
            if(!err){
              callback(200);
            } else {
              callback(500,{'Error' : 'Could not update the token\'s expiration.'});
            }
          });
        } else {
          callback(400,{"Error" : "The token has already expired, and cannot be extended."});
        }
      } else {
        callback(400,{'Error' : 'Specified user does not exist.'});
      }
    });
  } else {
    callback(400,{"Error": "Missing required field(s) or field(s) are invalid."});
  }
};


handlers._tokens.delete = function(data,callback){
  // todo that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Delete the token
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

handlers._tokens.verifyToken = function(id,phone,callback){
  // Lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if(!err && tokenData){
      // todo that the token is for the given user and has not expired
      if(tokenData.phone == phone && tokenData.expires > Date.now()){
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

handlers.todos = (data,callback)=>{
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._todos[data.method](data,callback);
  } else {
    callback(405);
  }
}

handlers._todos = {}

handlers._todos.post = (data,callback)=>{
  var title = typeof(data.payload.title) == "string" && data.payload.title.trim().length > 0 && data.payload.title.trim().length <= 30 ? data.payload.title : false;
  var text = typeof(data.payload.text) == "string" && data.payload.text.trim().length > 0 && data.payload.text.trim().length <= 500 ? data.payload.text : false;
  var dateCreated = Date.now();
  var deadline = Date.parse(new Date(data.payload.deadline).toString())
  deadline = typeof(deadline) == 'number' && deadline > Date.now() ? deadline : false;
  var secret = true;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;
  var dateDone = "~";
  var done = false;

  // Required fields
  if(title && text && deadline){
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    _data.read('tokens', token, (err,tokenData)=>{
      if(!err && tokenData){
        var userPhone = tokenData.phone;
        _data.read('users', userPhone, (err,userData)=>{
          if(!err && userData){
            var userTodos = typeof(userData.todos) == 'object' && userData.todos instanceof Array ? userData.todos : [];
            var todoId = helpers.createRandomString(20);
            var todoObject = {
              'fileName' : todoId,
              'id' : todoId,
              'userPhone':userPhone,
              'title': title,
              'text' : text,  
              'dateCreated':dateCreated,
              'deadline':deadline,
              'secret':secret,
              'password':password,
              'dateDone': dateDone,
              'done':done
            };

            _data.create('todos',todoObject, (err)=>{
              if(!err){
                userData.todos = userTodos;
                userData.todos.push(todoId);

                _data.update('users', userPhone, userData, (err)=>{
                  if(!err){
                    callback(200,todoObject)
                  }
                  else{
                    callback(500,{"Error":"Couldn't update user with the new todo"})
                  }
                })
              }
              else{
                callback(500,{"Error":"Couldn't create todo"})
              }
            });

          }
          else{
            callback(403)
          }
        });
      }
      else{
        callback(403)
      }
    });
  }
  else{
    callback(400 , {"Error" : "Missing required field(s)"});
  }



}


handlers._todos.get = (data , callback)=>{
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    _data.read('todos',id,(err,todoData)=>{
      if(!err && todoData){
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid for the phone number
        handlers._tokens.verifyToken(token,todoData.userPhone,function(tokenIsValid){
        if(tokenIsValid){
          callback(200,todoData)
        }
        else{
          callback(403);
        }
      });
      } 
      else{
        callback(404);
      }
    });
  }
  else{
    callback(400,{"Error":"Missing required field(s)"});
  }
}


handlers._todos.delete = (data,callback) => {
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    _data.read('todos',id,(err,todoData)=>{
      if(!err && todoData){
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        // Verify that the given token is valid for the phone number
        handlers._tokens.verifyToken(token,todoData.userPhone,function(tokenIsValid){
        if(tokenIsValid){
          _data.delete('todos', id, (err)=>{
            if(!err){
              _data.read('users',todoData.userPhone,function(err,userData){
                if(!err){
                  var userTodos = typeof(userData.todos) == 'object' && userData.todos instanceof Array ? userData.todos : [];

                  // Remove the deleted todo from their list of todos
                  var todoPosition = userTodos.indexOf(id);
                  if(todoPosition > -1){
                    userTodos.splice(todoPosition,1);
                    // Re-save the user's data
                    userData.todos = userTodos;
                    _data.update('users',todoData.userPhone,userData,function(err){
                      if(!err){
                        callback(200);
                      } else {
                        callback(500,{'Error' : 'Could not update the user.'});
                      }
                    });
                  } else {
                    callback(500,{"Error" : "Could not find the todo on the user's object, so could not remove it."});
                  }
                } else {
                  callback(500,{"Error" : "Could not find the user who created the todo, so could not remove the todo from the list of todos on their user object."});
                }
              });

            }
            else{
              callback(500,{"Error" : "Could not delete the todo data."});
            }
          });
        }
        else{
          callback(403);
        }
      });
      } 
      else{
        callback(404);
      }
    });
  }
  else{
    callback(400,{"Error":"Missing required field(s)"});
  }
}


handlers._todos.put = function(data,callback){
  // todo for required field
  var id = typeof(data.payload.todoid) == 'string' && data.payload.todoid.trim().length == 20 ? data.payload.todoid.trim() : false;

  // todo for optional fields
  var title = typeof(data.payload.title) == "string" && data.payload.title.trim().length > 0 && data.payload.title.trim().length <= 30 ? data.payload.title : false;
  var text = typeof(data.payload.text) == "string" && data.payload.text.trim().length > 0 && data.payload.text.trim().length <= 500 ? data.payload.text : false;
  var dateCreated = typeof(data.payload.dateCreated) == 'number' && data.payload.dateCreated > 0 && data.payload.dateCreated <= Date.now() ? data.payload.dateCreated : false;
  var deadline = typeof(data.payload.deadline) == 'number' && data.payload.deadline > Date.now() ? data.payload.deadline : false;
  var secret = typeof(data.payload.secret) == 'boolean' ? data.payload.secret : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;
  var dateDone = typeof(data.payload.dateDone) == 'number' && dateDone > 0 ? dateDone : false;
  var done = typeof(data.payload.done) == 'boolean' ? done : false;

  // Error if id is invalid
  if(id){
    // Error if nothing is sent to update
    if(title || text || dateCreated || deadline || secret || password || dateDone || done){
      // Lookup the todo
      _data.read('todos',id,function(err,todoData){
        if(!err && todoData){
          // Get the token that sent the request
          var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          // Verify that the given token is valid and belongs to the user who created the todo
          handlers._tokens.verifyToken(token,todoData.userPhone,function(tokenIsValid){
            if(tokenIsValid){
              // Update todo data where necessary
              if(title){
                todoData.title = title;
              }
              if(text){
                todoData.text = text;
              }
              if(dateCreated){
                todoData.dateCreated = dateCreated;
              }
              if(deadline){
                todoData.deadline = deadline;
              }
              if(secret){
                todoData.secret = secret;
              }
              
              if(password){
                var hashedPassword = helpers.hash(password)
                todoData.password = hashedPassword;
              }
              
              if(dateDone){
                todoData.dateDone = dateDone;
              }
              
              if(done){
                todoData.done = done;
              }

              // Store the new updates
              _data.update('todos',id,todoData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the todo.'});
                }
              });
            } else {
              callback(403);
            }
          });
        } else {
          callback(400,{'Error' : 'todo ID did not exist.'});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }
};

module.exports = handlers