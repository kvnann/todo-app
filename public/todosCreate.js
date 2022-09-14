var audio = new Audio('../public/snd.mp3');
var ff = ()=>{
    var buttons = document.getElementsByClassName("phoneButton");
    for(var i=0; i<buttons.length; i++){ 
        var button = buttons[i]
        var func = async function(button){
            await button.addEventListener("click" , ()=>{
                document.getElementById("password-input").value += button.innerHTML;
                audio.play();
            }); 
        }
        func(button)
    }
    var clear = document.getElementsByClassName("phoneButtonClear")[0];
    var backspace = document.getElementsByClassName("phoneButtonBackspace")[0];

    clear.addEventListener('click' , ()=>{
        document.getElementById("password-input").value = ""
    });
    backspace.addEventListener('click' , ()=>{
        var val = document.getElementById("password-input").value
        var len = val.length
        document.getElementById("password-input").value = val.slice(0,len-1)
    });
}
var sf = ()=>{ 
    var buttons = document.getElementsByClassName("phoneButton-given");
    for(var i=0; i<buttons.length; i++){ 
        var button = buttons[i]
        var func = async function(button){
            await button.addEventListener("click" , ()=>{
                document.getElementById("password-input-given").value += button.innerHTML;
                audio.play();
            }); 
        }
        func(button)
    }
    var clear = document.getElementsByClassName("phoneButtonClear-given")[0];
    var backspace = document.getElementsByClassName("phoneButtonBackspace-given")[0];

    clear.addEventListener('click' , ()=>{
        document.getElementById("password-input-given").value = ""
    });
    backspace.addEventListener('click' , ()=>{
        var val = document.getElementById("password-input-given").value
        var len = val.length
        document.getElementById("password-input-given").value = val.slice(0,len-1)
    });
}

ff()
sf()
