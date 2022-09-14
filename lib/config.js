var environments = {};

environments.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'hashingSecret' : 'thisIsASecret',
  'maxChecks' : 5,
  'templateGlobals' : {

  },
  "dbUrl" : "mongodb+srv://kvnann:5359@todos.x7ihl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  "dbName" : "todos",
  'twilio' : {
    'accountSid' : 'ACd818492b04c6942abc56e61dea690899',
    'authToken' : '14765347087ea272f520afa2639d36ea',
    'fromPhone' : '+15304530993'
  }
};

environments.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'hashingSecret' : 'thisIsAlsoASecret',
  'maxChecks' : 10,
  'templateGlobals' : {

  },
  "dbUrl" : "mongodb+srv://kvnann:5359@todos.x7ihl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  "dbName" : "todos",
  'twilio' : {
    'accountSid' : 'ACd818492b04c6942abc56e61dea690899',
    'authToken' : '14765347087ea272f520afa2639d36ea',
    'fromPhone' : '+15304530993'
  }
};

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;
