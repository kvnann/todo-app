const signinBtn = document.getElementById("btn-signin");
const signupBtn = document.getElementById("btn-signup");
const partOne = document.getElementById("part-one")
const partTwo = document.getElementById("part-two")
signinBtn.addEventListener("click" , ()=>{
    partOne.style.transform="translateX(0)";
    partTwo.style.transform="translateX(0)"; 
    partOne.classList.remove("display12")
    partOne.classList.add("display11")
    partTwo.classList.remove("display22")
    partTwo.classList.add("display21")
})
signupBtn.addEventListener("click" , ()=>{
    partOne.style.transform="translateX(100%)";
    partTwo.style.transform="translateX(-100%)";    
    partOne.classList.remove("display11")
    partOne.classList.add("display12")
    partTwo.classList.remove("display21")
    partTwo.classList.add("display22")
 })