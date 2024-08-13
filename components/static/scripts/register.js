import './navbar.js'
import { checkPasswordStrength } from './utilities/passwordStrength.js';


// external links cant be loaded
// import { passwordStrength } from './../../../node_modules/check-password-strength/dist/index.js'
// console.log(passwordStrength('asdfasdf').value)

// animate either mentor or mentee selected
function animateAccountType(){
    const overlayElem = document.querySelector('.js-overlay');
    document.querySelector('.js-mentor').addEventListener('click', ()=>{
    overlayElem.classList.remove('mentee-selected');
    overlayElem.classList.add('mentor-selected');
})
    document.querySelector('.js-mentee').addEventListener('click', ()=>{
    overlayElem.classList.remove('mentor-selected');
    overlayElem.classList.add('mentee-selected');
})
}

// custom validation for registration page
document.getElementById('js-register-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const isValid = handleRegister();
    if(isValid)
        window.location.href = 'question.html'

})

function handleRegister(){
    const firstName = document.getElementById('js-fname').value.trim();
    const lastName = document.getElementById('js-lname').value.trim();
    const email = document.getElementById('js-email').value.trim();
    const password = document.getElementById('js-password').value.trim();
    const country = document.getElementById('js-country').value;
    const terms = document.getElementById('js-terms').checked;

    const namePattern = /^[a-zA-Z]{3,}/;
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    let [fnameError, lnameError, EmailError, countryError, passwordError] = document.querySelectorAll('.error')
    let isValid = true

    if(!namePattern.test(firstName)){
        isValid=false;
        fnameError.textContent = "Invalid first name."
    }else{
        fnameError.textContent = ""
    }
    
    if(!namePattern.test(lastName)){
        isValid=false;
        lnameError.textContent = "Invalid last name."
    }else{
        lnameError.textContent = ""
    }

    
    if(!emailPattern.test(email)){
        isValid=false;
        EmailError.textContent = "Invalid email address."
    }else{
        EmailError.textContent = ""
    }

    if(!passwordPattern.test(password)){
        isValid=false;
        passwordError.textContent = `Password must be at least 8 characters with uppercase, lowercase, and special characters.`
    }else{
        passwordError.textContent = ""
    }

    if(country === "" || country === null){
        isValid = false;
        countryError.textContent = "Please select a country."
    }else{
        countryError.textContent = ""
    }

    if(!terms){
        isValid = false;
    }
    return isValid;
}


// toggle the password field to make it visible to the user
function togglePasswordField(){
    const passwordElem = document.getElementById('js-password');
    const showPassBtn = document.querySelector('.show-password-btn');
    
    showPassBtn.addEventListener('click', (event)=>{
        // event.preventDefault();
        document.querySelectorAll('.show-password-btn > svg').forEach(elem =>{
            elem.classList.toggle('hide')
        })
        if(passwordElem.type === 'password'){
            passwordElem.type = 'text'
        }else{
            passwordElem.type = 'password'
        }
    })
}

// animate the password strength
let strengthDesc;
function animatePasswordStrength(){
    let passwordStrength = {};
    const [passLenElem, passupperElem, passLowerElem, passNumElem, passSpecElem] = document.querySelectorAll('.password.strength.container ul  .js-list-item');
    const passwordElem = document.getElementById('js-password');
    passwordElem.addEventListener('input', ()=>{
        passwordStrength = checkPasswordStrength(passwordElem.value);
        /*
         * make the description section user friendly, 
         * password characters, uppercase, lowercase, numbers and special chars
         */
        if(passwordStrength.passesTest.length){
            passLenElem.classList.add('test-passed')
        }else{
            passLenElem.classList.remove('test-passed')
        }
        if(passwordStrength.passesTest.uppercase){
            passupperElem.classList.add('test-passed')
        }else{
            passupperElem.classList.remove('test-passed')
        }

        if(passwordStrength.passesTest.lowercase){
            passLowerElem.classList.add('test-passed')
        }else{
            passLowerElem.classList.remove('test-passed')
        }

        if(passwordStrength.passesTest.number){
            passNumElem.classList.add('test-passed')
        }else{
            passNumElem.classList.remove('test-passed')
        }

        if(passwordStrength.passesTest.specialcharacter){
            passSpecElem.classList.add('test-passed')
        }else{
            passSpecElem.classList.remove('test-passed')
        }

       /**
        *  give the user how strong is his password,
        *  how strong, that was either weak, medium or strong based on our strength description
        */
       const strengthKeywordElem = document.querySelector('.js-strength-keyword');
       const strengthVisualKey = document.querySelector('.js-key-strength');
       strengthDesc = passwordStrength.description();
       passwordStrength.keywords.forEach(keyword =>{
        if(strengthVisualKey.classList.contains(keyword)){
            strengthVisualKey.classList.remove(keyword);
            strengthKeywordElem.classList.remove(keyword);
        }
       })
       strengthVisualKey.classList.add(strengthDesc);
       strengthKeywordElem.classList.add(strengthDesc);




    })
}

animatePasswordStrength();


animateAccountType();
togglePasswordField();

document.querySelectorAll('.go-to-question-page').forEach(navigator => {
    navigator.addEventListener('click', ()=>{
        window.location.href = 'question.html'
    })
});