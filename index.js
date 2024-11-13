let logInForm = document.querySelector(".logInForm")
let logInFormChildern = logInForm.children
let loginName = logInFormChildern[1]
let loginPassword = logInFormChildern[2]
let loginbutton = logInFormChildern[3]
let signup = logInFormChildern[6]
let notFound = logInFormChildern[4]
let userName = logInForm.nextElementSibling.children[1]
let userEmali = logInForm.nextElementSibling.children[2]
let userPassword = logInForm.nextElementSibling.children[3]
let signupbutton = logInForm.nextElementSibling.children[4]
let signin = logInForm.nextElementSibling.children[7]
let nav = logInForm.nextElementSibling.nextElementSibling
let home = nav.nextElementSibling
let navChildren = nav.children
let logout = document.querySelector(".logout")
let welcomName = document.querySelector(".welcomName")
let nonevalid = document.querySelector(".nonevalid")
let searchresult=true





signup.addEventListener("click", function () {
    logInForm.classList.add("d-none")
    logInForm.nextElementSibling.classList.remove("d-none")
    
    clearForm()
})
signin.addEventListener("click", function () {
    logInForm.classList.remove("d-none")
    logInForm.nextElementSibling.classList.add("d-none")
    clearForm()
})
logout.addEventListener("click", function () {
    nav.classList.add("d-none")
    home.classList.add("d-none")
    logInForm.classList.remove("d-none")
    clearForm()

})


// get data and check if data in localstorege or not
// if in localstorage apper the home padge
// if not apper error


// check if local storge have anydata
let users = []
if (localStorage.getItem("users") == null) {
    users = []
}
else {
    users = JSON.parse(localStorage.getItem("users"))
}
// to store the data in local storage
function signUp() {
    let user = {
        userName: userName.value,
        userEmali: userEmali.value,
        userPassword: userPassword.value,
    }
    search()
    if (ifValid() && searchresult) {
        
        
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users))
        displayHome()
        clearForm()
        nonevalid.classList.add("d-none")
    }
    else{
        nonevalid.classList.remove("d-none")
    }
}
signupbutton.addEventListener("click", signUp)
loginbutton.addEventListener("click", function (e) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].userName == loginName.value && users[i].userPassword == loginPassword.value) {
            displayHome()
            welcomName.innerHTML = loginName.value
            notFound.classList.add("d-none")
            clearForm()

            break;

        }
        else {
            notFound.classList.remove("d-none")
        }
    }
})
logInForm.nextElementSibling.addEventListener("input", function (e) {
    valid(e)
})
function displayHome() {

    logInForm.classList.add("d-none")
    logInForm.nextElementSibling.classList.add("d-none")
    nav.classList.remove("d-none")
    home.classList.remove("d-none")
    welcomName.innerHTML = userName.value

}
function clearForm() {
    userName.value = ""
    userEmali.value = ''
    userPassword.value = ''
    loginPassword.value = ""
    loginName.value = ""
    userName.classList.remove("is-valid")
    userPassword.classList.remove("is-valid")
    userEmali.classList.remove("is-valid")
    userName.classList.remove("is-invalid")
    userPassword.classList.remove("is-invalid")
    userEmali.classList.remove("is-invalid")
    nonevalid.classList.add("d-none")
    notFound.classList.add("d-none")


}

function valid(e) {
    let validatio = {
        userName: /^[a-z]{3,9}$/,
        userEmali: /^\w{3,9}.com$/,
        userPassword: /^\w{3,15}$/
    }
    if (validatio[e.target.classList[0]].test(e.target.value)) {
        e.target.classList.remove("is-invalid")
        e.target.classList.add("is-valid")
    }
    else {
        e.target.classList.remove("is-valid")
        e.target.classList.add("is-invalid")

    }


}
function ifValid(e) {
    if (userName.classList.contains("is-valid") &&
        userEmali.classList.contains("is-valid") &&
        userPassword.classList.contains("is-valid")) {
        return true
    }
    else {
        return false
    }
}

function search(){
    for(let i=0;i<users.length;i++){
        if(users[i].userEmali==userEmali.value){
            searchresult=false
        }
    }
}
