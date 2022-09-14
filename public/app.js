
var app = {};

// Config
app.config = {
  'sessionToken' : false
};



// AJAX Client (for RESTful API)
app.client = {}
myapp = {}

myapp.client = {}

myapp.client.formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('/');
}

app.interpolate = function(str,data){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // Add the templateGlobals to the data object, prepending their key name with "global."
  // For each key in the data object, insert its value into the string at the corresponding placeholder
  for(var key in data){
     if(data.hasOwnProperty(key) && typeof(data[key]) == 'string'){
        var replace = data[key];
        var find = '{'+key+'}';
        str = str.replace(find,replace);
     }
  }
  return str;
};
var audio = new Audio('../public/snd.mp3');

var home = (todos)=>{
  document.querySelector('.todos').classList.add('show');
  document.querySelector('.todos').classList.remove('hide');
  todos.forEach((todo)=>{
    
    var headers = {
        token:JSON.parse(localStorage.getItem('token')).id
    }
    var todoOpen = false;
    var todoId = todo.id
    var passCheckButton = document.querySelector('#' + todoId + ' #passwordCheck');
    var todoFunc = {}
    var obj = {
      id:todoId
    }
    todoFunc.checkPassword = (responsePayload)=>{
        var password = document.querySelector('#' + todoId + ' #password-input').value;
        if(password === responsePayload.password){
            var deadline = new Date(responsePayload.deadline)
            var dateCreated = new Date(responsePayload.dateCreated)
            document.querySelector('#' + todoId + ' .todoCreated').innerHTML="Crated on " + myapp.client.formatDate(dateCreated);
            document.querySelector('#' + todoId + ' .todoDeadline').innerHTML="Deadline: " + myapp.client.formatDate(deadline);
            document.querySelector('#' + todoId + ' .todoText').innerHTML=responsePayload.text
            document.querySelector('#' + todoId + ' .locked').style.display="none"
            document.querySelector('#' + todoId + ' .unlocked').style.display="block"
            setTimeout(()=>{
              document.querySelector('#' + todoId + ' .locked').style.display="block"
            },1000*60*30);
        }
        else{
            document.querySelector('#' + todoId + ' .errorMessage').style.display="block"
            document.querySelector('#' + todoId + ' .errorMessage').innerHTML = "Wrong password"
        }
    }
    passCheckButton.addEventListener('click', ()=>{
      document.querySelector("#" + todoId + " .waitingMessage").style.display="block"
      document.querySelector("#" + todoId + " .errorMessage").style.display="none"
        app.client.request(headers,'./api/todos','get',obj,undefined,(statusCode,responsePayload)=>{
            if(statusCode !== 200){
                var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';
                // Set the errorMessage field with the error text
                document.querySelector("#"+todoId+" .errorMessage").innerHTML = error;
  
                // Show (unhide) the form error field on the form
                document.querySelector("#"+todoId+" .errorMessage").style.display = 'block';
                document.querySelector("#"+todoId+" .waitingMessage").style.display = 'none';
            }
            else{
                todoFunc.checkPassword(responsePayload)
                document.querySelector("#"+todoId+" .waitingMessage").style.display="none"
            }
        });
    });
    var phoneButtons = document.querySelectorAll("#" + todoId + " .phoneButton");
    for(var i=0; i<phoneButtons.length; i++){ 
        var button = phoneButtons[i]
        var func = async function(button){
            await button.addEventListener("click" , ()=>{
                document.querySelector("#" +todoId+ " #password-input").value += button.innerHTML;
                audio.play();
            }); 
        }
        func(button)
    }
    var clear = document.querySelector("#" +todoId+ " .phoneButtonClear");
    var backspace = document.querySelector("#" +todoId+ " .phoneButtonBackspace");
    
    clear.addEventListener('click' , ()=>{
        document.querySelector("#" +todoId+" #password-input").value = ""
    });
    backspace.addEventListener('click' , ()=>{
        var val = document.querySelector("#" +todoId+" #password-input").value
        var len = val.length
        document.querySelector("#" +todoId+" #password-input").value = val.slice(0,len-1)
    });
    document.querySelector('#' + todoId).onmouseover = ()=>{
      document.querySelector('#' + todoId + " .edit").style.color="#F0E2CB"
      document.querySelector('#' + todoId + " .delete").style.color="#F0E2CB"

    }
    document.querySelector('#' + todoId).onmouseleave = ()=>{
      document.querySelector('#' + todoId + " .edit").style.color="#202a46"
      document.querySelector('#' + todoId + " .delete").style.color="#202a46"

    }
    document.querySelector('#' + todoId + " .todo-top").addEventListener('click' , ()=>{
        if(todoOpen){
            document.querySelector('#' + todoId + " .todo-bottom").style.display="none"
            document.querySelector('#' + todoId + " .todo-bottom").style.opacity="0"
            document.querySelector('#' + todoId + " .todo-top .todo-right").style.borderLeft="1px solid #202a46";
            document.querySelector('#' + todoId).style.color="#F0E2CB";
            document.querySelector('#' + todoId + " .todo-top .todo-right").style.color="#202a46";
           
            document.querySelector('#' + todoId).onmouseover = ()=>{
                document.querySelector('#' + todoId).style.color="#F0E2CB";
                document.querySelector('#' + todoId + " .todo-top .todo-left").style.filter="blur(2px)";
                document.querySelector('#' + todoId + " .todo-top .todo-right").style.filter="blur(2px)";
                document.querySelector('#' + todoId + " .todo-top .todo-right").style.color="#F0E2CB";
                document.querySelector('#' + todoId + " .edit").style.color="#F0E2CB"
                document.querySelector('#' + todoId + " .delete").style.color="#F0E2CB"

            }
            document.querySelector('#' + todoId).onmouseleave = ()=>{
                document.querySelector('#' + todoId).style.color="#202a46";
                document.querySelector('#' + todoId + " .todo-top .todo-left").style.filter="none";
                document.querySelector('#' + todoId + " .todo-top .todo-right").style.filter="none";
                document.querySelector('#' + todoId + " .todo-top .todo-right").style.color="#202a46";
                document.querySelector('#' + todoId + " .edit").style.color="#202a46"
                document.querySelector('#' + todoId + " .delete").style.color="#202a46"
            }

            document.querySelector('#' + todoId + " .edit").style.color="#202a46"
            document.querySelector('#' + todoId + " .delete").style.color="#202a46"

        }
        else{
            var buttons = document.querySelectorAll("#" + todoId +" .phoneButton");
            for(var i=0;i<buttons.length;i++){
                var button = buttons[i]
                var selectedTodo = document.querySelector('#' + todoId)
                var func = async function(button){
                    await selectedTodo.addEventListener('mouseover' ,()=>{
                        document.querySelector('#' + todoId + " .phoneButtonBackspace").style.border="4px solid #F0E2CB"
                        document.querySelector('#' + todoId + " .phoneButtonBackspace").style.color="#F0E2CB"
                        document.querySelector('#' + todoId + " .phoneButtonClear").style.border="4px solid #F0E2CB"
                        document.querySelector('#' + todoId + " .phoneButtonClear").style.color="#F0E2CB"

                        button.style.border="4px solid #F0E2CB";
                        button.style.color="#F0E2CB"
                        selectedTodo.style.color="#F0E2CB";
                    });
                    await selectedTodo.addEventListener('mouseleave' , ()=>{
                        document.querySelector('#' + todoId + " .phoneButtonBackspace").style.border="4px solid #202a46"
                        document.querySelector('#' + todoId + " .phoneButtonBackspace").style.color="#202a46"
                        document.querySelector('#' + todoId + " .phoneButtonClear").style.border="4px solid #202a46"
                        document.querySelector('#' + todoId + " .phoneButtonClear").style.color="#202a46"
                        button.style.border="4px solid #202a46"
                        selectedTodo.style.color="#202a46";
                        button.style.color="#202a46"
                    });
                  }
                  func(button)
                }
                document.querySelector('#' + todoId + " .todo-bottom").style.display="flex"
                document.querySelector('#' + todoId + " .todo-bottom").style.opacity="1"
                document.querySelector('#' + todoId + " .todo-top .clickme").innerHTML = "Click here again to hide detail"
                document.querySelector('#' + todoId + " .todo-top .todo-right").style.border="none";
                document.querySelector('#' + todoId + " .todo-top .todo-right").style.color="none";
                document.querySelector('#' + todoId + " .todo-top .todo-left").style.filter="none";
                document.querySelector('#' + todoId + " .todo-top .todo-right").style.filter="none";
                
                
                document.querySelector('#' + todoId).style.color="#F0E2CB";
                document.querySelector('#' + todoId).onmouseover = ()=>{
                  document.querySelector('#' + todoId).style.color="#F0E2CB";
                  document.querySelector('#' + todoId + " .todo-top .todo-right").style.color="#F0E2CB";

                  document.querySelector('#' + todoId + " .edit").style.color="#F0E2CB"
                  document.querySelector('#' + todoId + " .delete").style.color="#F0E2CB"
                }
                document.querySelector('#' + todoId).onmouseleave = ()=>{
                  document.querySelector('#' + todoId).style.color="#202a46";
                  document.querySelector('#' + todoId + " .todo-top .todo-right").style.color="#202a46";
                  document.querySelector('#' + todoId + " .edit").style.color="#202a46"
                  document.querySelector('#' + todoId + " .delete").style.color="#202a46"
                  
                }

        }
        todoOpen = !todoOpen
    });        
  });
}


app.todoTemplate = 
`
<div class="todo todoLocked" id="{todoId}">
  <div class="todo-top">
      <div class="todo-left">{todoTitle}</div>
      <div class="clickme">Click me!</div>
      <div class="todo-right"><a href="./todos/edit?id={todoIdForEdit}" class="delete">Delete</a> / <a href="./todos/edit?id={todoIdForDelete}" class="edit">Edit</a></div>
  </div>
  <div class="todo-bottom">
    <center>
      <div class="locked">
        Write the password to access detail
        <div class="waitingMessage"><center><div class="dots-bars-2"></div></center></div>
        <div class="errorMessage">An error has occured, please try again</div>
        <div class="formElement">
            <input name="password" id="password-input" class="password-input" type="password">
            <div class="phoneButtons">
                <div class="first-row row phone-row">
                    <div class="phoneButton col" id="btn1">1</div>
                    <div class="phoneButton col" id="btn2">2</div>
                    <div class="phoneButton col" id="btn3">3</div>
                </div>  
                <div class="second-row row phone-row">
                    <div class="phoneButton col" id="btn4">4</div>
                    <div class="phoneButton col" id="btn5">5</div>
                    <div class="phoneButton col" id="btn6">6</div>
                </div>  
                <div class="third-row row phone-row">
                    <div class="phoneButton col" id="btn7">7</div>
                    <div class="phoneButton col" id="btn8">8</div>
                    <div class="phoneButton col" id="btn9">9</div>
                </div>  
                <div class="fourth-row row phone-row">
                    <div class="phoneButtonClear col" id="btn10">C</div>
                    <div class="phoneButton col" id="btn0">0</div>
                    <div class="phoneButtonBackspace col" id="btn12"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16">
                        <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
                      </svg></div>
                </div>  
            </div>
        </div>
        <button id="passwordCheck" class='btn' style="margin-top: 10px;">Submit</button>
      </div>
      <div class="unlocked">
          <div class="todoText">{todoText}</div>
          <div class="spc-btwn">
              <div class="todoCreated">{dateCreated}</div>
              <div class="todoDeadline">{deadline}</div>
          </div>
          
      </div>
    </center>
  </div>
</div>


`


// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){

  // Set defaults
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  var requestUrl = path+'?';
  var counter = 0;
  for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl+='&';
       }
       // Add the key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
  }

  // Form the http request as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey, headers[headerKey]);
     }
  }


  // If there is a current session token set, add that as a header
  if(app.config.sessionToken){
    xhr.setRequestHeader("token", app.config.sessionToken.id);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        var statusCode = xhr.status;
        var responseReturned = xhr.responseText;

        // Callback if requested
        if(callback){
          try{
            var parsedResponse = JSON.parse(responseReturned);
            callback(statusCode,parsedResponse);
          } catch(e){
            callback(statusCode,false);
          }

        }
      }
  }

  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);

};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Log the user out then redirect them
app.logUserOut = function(redirectUser){
  // Set redirectUser to default to true
  redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'id' : tokenId
  };
  app.client.request(undefined,'api/tokens','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    if(redirectUser){
      window.location = '/';
    }

  });
};

// Bind the forms
app.bindForms = function(){
  if(document.querySelector("form")){

    var allForms = document.querySelectorAll("form");
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){
          // Stop it from submitting
          e.preventDefault();
          var formId = typeof(this.id) == 'string' ? this.id : this.id.value;
          var path = this.action;
          var method = this.method.toUpperCase();
          document.querySelector("#" + formId + " .waitingMessage").style.display = "block";
          // Hide the error message (if it's currently shown due to a previous error)
          document.querySelector("#"+formId+" .errorMessage").style.display = 'none';
          // Hide the success message (if it's currently shown due to a previous error)
          if(document.querySelector("#"+formId+" .successMessage")){
            document.querySelector("#"+formId+" .successMessage").style.display = 'none';
          }


        // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            // Determine class of element and set value accordingly
            var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
            var valueOfElement = elements[i].type == 'checkbox' && classOfElement.indexOf('multiselect') == -1 ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
            var elementIsChecked = elements[i].checked;
            // Override the method of the form if the input's name is _method
            var nameOfElement = elements[i].name;
            if(nameOfElement == '_method'){
              method = valueOfElement;
            } else {
              // Create an payload field named "method" if the elements name is actually httpmethod
              if(nameOfElement == 'httpmethod'){
                nameOfElement = 'method';
              }
              // Create an payload field named "id" if the elements name is actually uid
              if(nameOfElement == 'uid'){
                nameOfElement = 'id';
              }
              // If the element has the class "multiselect" add its value(s) as array elements
              if(classOfElement.indexOf('multiselect') > -1){
                if(elementIsChecked){
                  payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                  payload[nameOfElement].push(valueOfElement);
                }
              } else {
                payload[nameOfElement] = valueOfElement;
              }

            }
          }
        }


        // If the method is DELETE, the payload should be a queryStringObject instead
        var queryStringObject = method == 'DELETE' ? payload : {};

        // Call the API
        app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode !== 200){

            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {

              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the errorMessage field with the error text
              document.querySelector("#"+formId+" .errorMessage").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#"+formId+" .errorMessage").style.display = 'block';
              document.querySelector("#"+formId+" .waitingMessage").style.display = 'none';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId,payload,responsePayload);
            document.querySelector("#"+formId+" .successMessage").style.display="block"
            document.querySelector("#"+formId+" .waitingMessage").style.display="none"
          }
        });
      });
    }
  }
};

// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  var functionToCall = false;
  // If account creation was successful, try to immediately log the user in
  if(formId == 'accountCreate'){
    // Take the phone and password, and use it to log the user in
    var newPayload = {
      'phone' : requestPayload.phone,
      'password' : requestPayload.password
    };

    app.client.request(undefined,'../api/tokens','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed
      if(newStatusCode !== 200){

        // Set the errorMessage field with the error text
        document.querySelector("#"+formId+" .errorMessage").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .errorMessage").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        window.location = '/home';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    window.location = '/home';
  }

  // If forms saved successfully and they have success messages, show them
  var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2','todosEdit'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#"+formId+" .successMessage").style.display = 'block';
  }

  // If the user just deleted their account, redirect them to the account-delete page
  if(formId == 'accountEdit3'){
    app.logUserOut(false);
    window.location = '/';
  }

  // If the user just created a new check successfully, redirect back to the dashboard
  if(formId == 'todosCreate'){
    window.location = '/home';
  }

  // If the user just deleted a check, redirect them to the dashboard
  if(formId == 'todosEdit2'){
    window.location = '/home';
  }

};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token',tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'id' : currentToken.id,
      'extend' : true,
    };
    app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'id' : currentToken.id};
        app.client.request(undefined,'api/tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Load data on the page
app.loadDataOnPage = function(){  
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for account settings page
  if(primaryClass == 'accountEdit'){
    app.loadAccountEditPage();
  }

  // Logic for dashboard page
  if(primaryClass == 'homePage'){
    app.loadtodosListPage();
  }

  // Logic for check details page
  if(primaryClass == 'todosEdit'){
    app.loadtodosEditPage();
  }
};

// Load the account edit page specifically
app.loadAccountEditPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  if(phone){
    // Fetch the user data
    var queryStringObject = {
      'phone' : phone
    };
    document.querySelector("#accountEdit3").style.display="block"
    document.querySelector("#accountEdit3 .deleteAccount").addEventListener('click' , ()=>{
      app.client.request(undefined,'../api/users','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
        if(statusCode == 200){
          alert("Account deleted successfully");
          window.location = '/'
        }
        else{
          alert("Could not delete account :(");
        }
      });
    });
    app.client.request(undefined,'../api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .displayPhoneInput").value = responsePayload.phone;
        document.querySelector("#accountEdit1 .displayFirstNameInput").value = responsePayload.firstName;
        document.querySelector("#accountEdit1 .displayLastNameInput").value = responsePayload.lastName;
        document.querySelector("#accountEdit1 .displayFirstNameInput").disabled = false;
        document.querySelector("#accountEdit1 .displayLastNameInput").disabled = false;

        // Put the hidden phone field into both forms
        var hiddenPhoneInputs = document.querySelectorAll("input.hiddenPhoneNumberInput");
        for(var i = 0; i < hiddenPhoneInputs.length; i++){
            hiddenPhoneInputs[i].value = responsePayload.phone;
        }



      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Load the dashboard page specifically
app.loadtodosListPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  if(phone){
    // Fetch the user data
    var queryStringObject = {
      'phone' : phone
    };
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined, function(statusCode,responsePayload){
      if(statusCode == 200){
        document.querySelector('.usernametoDisplay').classList.add('show');
        document.querySelector('.usernametoDisplay').classList.remove('hide');
        document.querySelector('.userNameToShow').innerHTML = responsePayload.firstName;
        // Determine how many todos the user has
        var alltodos = typeof(responsePayload.todos) == 'object' && responsePayload.todos instanceof Array && responsePayload.todos.length > 0 ? responsePayload.todos : [];
        if(alltodos.length > 0){

          // Show each created check as a new row in the table
          document.querySelector('.todos').innerHTML = "<h1 class='loading'>Loading your to-dos...</h1>";
          var err = 0
          alltodos.forEach(function(todoId){
            // Get the data for the check
            var newQueryStringObject = {
              'id' : todoId
            };
            app.client.request(undefined,'api/todos','GET',newQueryStringObject,undefined,function(statusCode,responsePayload){
              if(statusCode == 200){
                var todoData = responsePayload;
                var templateData = {
                  "todoId":todoData.id,
                  "todoTitle":todoData.title,
                  "todoIdForDelete":todoData.id,
                  "todoIdForEdit":todoData.id
                };
                var str = app.todoTemplate;
                str = app.interpolate(str,templateData);
                document.querySelector('.todos').innerHTML += str;
                
              } else {
                err++
                console.log("Error trying to load todo ID: ",todoId);
              }
            });
          });
          
          var todos = document.querySelectorAll('.todo')
          var refreshIntervalId = setInterval(()=>{

            todos = document.querySelectorAll('.todo')
            if(todos.length == alltodos.length - err){

              clearInterval(refreshIntervalId);
              home(todos);

            }
          }, 1000); 

          
          
        } else {
          // Show 'you have no todos' message
          document.getElementById("noTodosMessage").style.display = 'flex';

        }
      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};


// Load the todos edit page specifically
app.loadtodosEditPage = function(){
  // Get the check id from the query string, if none is found then redirect back to dashboard
  var id = typeof(window.location.href.split('=')[1]) == 'string' && window.location.href.split('=')[1].length > 0 ? window.location.href.split('=')[1] : false;
  if(id){
    // Fetch the check data
    var queryStringObject = {
      'id' : id
    };
    document.querySelector("#passwordCheck-given").addEventListener('click' , ()=>{
      var userGivenPassword = document.querySelector('#password-input-given').value;
      document.querySelector(".waitingMessage-given").style.display='block';
      app.client.request(undefined,'../api/todos','GET',queryStringObject,undefined,function(statusCode,responsePayload){
        if(userGivenPassword == responsePayload.password){
          if(statusCode == 200){
            var hiddenIdInputs = document.querySelectorAll("input.hiddenIdInput");
            for(var i = 0; i < hiddenIdInputs.length; i++){
                hiddenIdInputs[i].value = responsePayload.id;
            }
            document.querySelector(".box").style.width="auto"
            document.querySelector(".waitingMessage-given").style.display='none';
            document.querySelector("#todosEdit1").style.display="block"
            document.querySelector("#todosEdit3").style.display="block"
            document.querySelector(".requirePassword").style.display = "none";

            
            document.querySelector("#todosEdit1 .title").value = responsePayload.title;
            document.querySelector("#todosEdit1 .text").value = responsePayload.text;
            document.querySelector("#todosEdit1 .deadline").value = responsePayload.deadline;

            document.querySelector("#todosEdit3 .deleteTodo").addEventListener('click' , ()=>{
              app.client.request(undefined,'../api/todos','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
                if(statusCode == 200){
                  alert("To-do deleted successfully");
                  window.location = '/home'
                }
                else{
                  alert("Could not delete to-do :(");
                }
              });
            });

          } else {
            window.location = '/home';
          }
        }
        else{
          document.querySelector(".waitingMessage-given").style.display='none';
          document.querySelector(".errorMessage-given").style.display='block';
          document.querySelector(".errorMessage-given").innerHTML='Wrong password';
        }
      });
    });
  } else {
    window.location = '/home';
  }
};

// Loop to renew token often
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());
      }
    });
  },1000 * 60);
};

// Init (bootstrapping)
app.init = function(){

  // Bind all form submissions
  app.bindForms();

  // Bind logout logout button
 // app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};
