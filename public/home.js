// var myapp = {};
// myapp.config = {
//     'sessionToken' : false
//   };
// // Config

// // AJAX Client (for RESTful API)
// myapp.client = {}

// myapp.client.formatDate = (date) => {
//     var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2) 
//         month = '0' + month;
//     if (day.length < 2) 
//         day = '0' + day;

//     return [day, month, year].join('/');
// }

// // Interface for making API calls
// myapp.client.request = function(headers,path,method,queryStringObject,payload,callback){

//   // Set defaults
//   headers = typeof(headers) == 'object' && headers !== null ? headers : {};
//   path = typeof(path) == 'string' ? path : '/';
//   method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
//   queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
//   payload = typeof(payload) == 'object' && payload !== null ? payload : {};
//   callback = typeof(callback) == 'function' ? callback : false;

//   // For each query string parameter sent, add it to the path
//   var requestUrl = path+'?';
//   var counter = 0;
//   for(var queryKey in queryStringObject){
//      if(queryStringObject.hasOwnProperty(queryKey)){
//        counter++;
//        // If at least one query string parameter has already been added, preprend new ones with an ampersand
//        if(counter > 1){
//          requestUrl+='&';
//        }
//        // Add the key and value
//        requestUrl+=queryKey+'='+queryStringObject[queryKey];
//      }
//   }

//   // Form the http request as a JSON type
//   var xhr = new XMLHttpRequest();
//   xhr.open(method, requestUrl, true);
//   xhr.setRequestHeader("Content-type", "myapplication/json");

//   // For each header sent, add it to the request
//   for(var headerKey in headers){
//      if(headers.hasOwnProperty(headerKey)){
//        xhr.setRequestHeader(headerKey, headers[headerKey]);
//      }
//   }

//   // If there is a current session token set, add that as a header
//   if(myapp.config.sessionToken){
//     xhr.setRequestHeader("token", myapp.config.sessionToken.id);
//   }

//   // When the request comes back, handle the response
//   xhr.onreadystatechange = function() {
//       if(xhr.readyState == XMLHttpRequest.DONE) {
//         var statusCode = xhr.status;
//         var responseReturned = xhr.responseText;

//         // Callback if requested
//         if(callback){
//           try{
//             var parsedResponse = JSON.parse(responseReturned);
//             callback(statusCode,parsedResponse);
//           } catch(e){
//             callback(statusCode,false);
//           }

//         }
//       }
//   }

//   // Send the payload as JSON
//   var payloadString = JSON.stringify(payload);
//   xhr.send(payloadString);

// };
// var todos = document.getElementsByClassName('todo');
// var audio = new Audio('../public/snd.mp3');
// for(var i = 0; i<todos.length; i++){
//     var todoOpen = false;
//     var todo = document.getElementsByClassName('todo')[i];
//     var todoId = todo.id

//     var passCheckButton = document.querySelector('#' + todoId + ' #passwordCheck');
//     var todoFunc = {}
//     var obj = {
//         id:todoId
//     }
//     todoFunc.checkPassword = (responsePayload)=>{
//         var password = document.querySelector('#' + todoId + ' #password-input').value;
//         if(password === responsePayload.password){
//             var deadline = new Date(responsePayload.deadline)
//             var dateCreated = new Date(responsePayload.dateCreated)
//             // document.querySelector('#' + todoId + ' .todoCreated').innerHTML="Crated on " + myapp.client.formatDate(dateCreated);
//             // document.querySelector('#' + todoId + ' .todoDeadline').innerHTML="Deadline: " + myapp.client.formatDate(deadline);
//             // document.querySelector('#' + todoId + ' .todoText').innerHTML=responsePayload.text
//             document.querySelector('#' + todoId + ' .locked').style.display="none"
//             document.querySelector('#' + todoId + ' .unlocked').style.display="block"
//         }
//         else{
//             document.querySelector('#' + todoId + ' .errorMessage').style.display="block"
//         }
//     }
//     var headers = {
//         token:JSON.parse(localStorage.getItem('token')).id
//     }
//     passCheckButton.addEventListener('click', ()=>{
//         myapp.client.request(headers,'./api/todos','get',obj,undefined,(statusCode,responsePayload)=>{
//             if(statusCode !== 200){
//                 var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

//                 // Set the errorMessage field with the error text
//                 // document.querySelector("#"+formId+" .errorMessage").innerHTML = error;
  
//                 // Show (unhide) the form error field on the form
//                 // document.querySelector("#"+formId+" .errorMessage").style.display = 'block';
//                 // document.querySelector("#"+formId+" .waitingMessage").style.display = 'none';
//             }
//             else{
//                 todoFunc.checkPassword(responsePayload)
//                 // document.querySelector("#"+formId+" .waitingMessage").style.display="none"
//             }
//         });
//     });
//     var phoneButtons = document.querySelectorAll("#" + todoId + " .phoneButton");
//     for(var i=0; i<phoneButtons.length; i++){ 
//         var button = phoneButtons[i]
//         var func = async function(button){
//             await button.addEventListener("click" , ()=>{
//                 document.querySelector("#" +todoId+ " #password-input").value += button.innerHTML;
//                 audio.play();
//             }); 
//         }
//         func(button)
//     }
//     var clear = document.getElementsByClassName("phoneButtonClear")[0];
//     var backspace = document.getElementsByClassName("phoneButtonBackspace")[0];
    
//     clear.addEventListener('click' , ()=>{
//         document.getElementById("password-input").value = ""
//     });
//     backspace.addEventListener('click' , ()=>{
//         var val = document.getElementById("password-input").value
//         var len = val.length
//         document.getElementById("password-input").value = val.slice(0,len-1)
//     });
//     document.querySelector('#' + todoId + " .todo-top").addEventListener('click' , ()=>{
//         if(todoOpen){
//             document.querySelector('#' + todoId + " .todo-bottom").style.display="none"
//             document.querySelector('#' + todoId + " .todo-bottom").style.opacity="0"
//             document.querySelector('#' + todoId + " .todo-top .todo-right").style.borderLeft="1px solid #202a46";
//             document.querySelector('#' + todoId).style.color="#F0E2CB";
//             document.querySelector('#' + todoId).onmouseover = ()=>{
//                 document.querySelector('#' + todoId).style.color="#F0E2CB";
//                 document.querySelector('#' + todoId + " .todo-top .todo-left").style.filter="blur(2px)";
//                 document.querySelector('#' + todoId + " .todo-top .todo-right").style.filter="blur(2px)";
//             }
//             document.querySelector('#' + todoId).onmouseleave = ()=>{
//                 document.querySelector('#' + todoId).style.color="#202a46";
//                 document.querySelector('#' + todoId + " .todo-top .todo-left").style.filter="none";
//                 document.querySelector('#' + todoId + " .todo-top .todo-right").style.filter="none";
//             }
//         }
//         else{
//             var buttons = document.querySelectorAll("#" + todoId +" .phoneButton");
//             for(var i=0;i<buttons.length;i++){
//                 var button = buttons[i]
//                 var selectedTodo = document.querySelector('#' + todoId)
//                 var func = async function(button){
//                     await selectedTodo.addEventListener('mouseover' ,()=>{
//                         document.querySelector('#' + todoId + " .phoneButtonBackspace").style.border="4px solid #F0E2CB"
//                         document.querySelector('#' + todoId + " .phoneButtonBackspace").style.color="#F0E2CB"
//                         document.querySelector('#' + todoId + " .phoneButtonClear").style.border="4px solid #F0E2CB"
//                         document.querySelector('#' + todoId + " .phoneButtonClear").style.color="#F0E2CB"
//                         button.style.border="4px solid #F0E2CB";
//                         button.style.color="#F0E2CB"
//                         selectedTodo.style.color="#F0E2CB";
//                     });
//                     await selectedTodo.addEventListener('mouseleave' , ()=>{
//                         document.querySelector('#' + todoId + " .phoneButtonBackspace").style.border="4px solid #202a46"
//                         document.querySelector('#' + todoId + " .phoneButtonBackspace").style.color="#202a46"
//                         document.querySelector('#' + todoId + " .phoneButtonClear").style.border="4px solid #202a46"
//                         document.querySelector('#' + todoId + " .phoneButtonClear").style.color="#202a46"
//                         button.style.border="4px solid #202a46"
//                         selectedTodo.style.color="#202a46";
//                         button.style.color="#202a46"
//                     });
//                 }
//                 func(button)
//             }
//             document.querySelector('#' + todoId + " .todo-bottom").style.display="flex"
//             document.querySelector('#' + todoId + " .todo-bottom").style.opacity="1"
//             document.querySelector('#' + todoId + " .todo-top .clickme").innerHTML = "Click here again to hide detail"
//             document.querySelector('#' + todoId + " .todo-top .todo-right").style.border="none";
//             document.querySelector('#' + todoId + " .todo-top .todo-right").style.color="none";
//             document.querySelector('#' + todoId + " .todo-top .todo-left").style.filter="none";
//             document.querySelector('#' + todoId + " .todo-top .todo-right").style.filter="none";
//             document.querySelector('#' + todoId).style.color="#F0E2CB";
//             document.querySelector('#' + todoId).onmouseover = ()=>{
//                 document.querySelector('#' + todoId).style.color="#F0E2CB";
//             }
//             document.querySelector('#' + todoId).onmouseleave = ()=>{
//                 document.querySelector('#' + todoId).style.color="#202a46";
//             }
//         }
//         todoOpen = !todoOpen
//     });        
// }