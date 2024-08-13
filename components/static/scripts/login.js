
document.getElementById('js-login-form').addEventListener('submit', (event)=>{
    event.preventDefault();
    const isValid = handleLogin();
    if(isValid)
        window.location.href ='question.html'
})

let previousTimeouts = [];
function handleLogin(){
    const usernameOrEmail = document.getElementById('js-email-username').value.trim()
    const password = document.getElementById('js-password').value.trim()

    const usernamePattern = /^[a-zA-Z0-9]{4,12}$/;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;

    let usernameError = document.getElementById('js-username-error');
    let passwordError = document.getElementById('js-password-error');
    let forgotPassword = document.getElementById('js-forgot-password-error');

    let isValid = true;

    if(emailPattern.test(usernameOrEmail) || usernamePattern.test(usernameOrEmail)){
        usernameError.textContent = ''
    }else{
        isValid = false;
        usernameError.textContent = 'Invalid username or email.'
    }

    if(passwordPattern.test(password)){
        passwordError.textContent = ''
    }else{
        isValid = false;
        passwordError.textContent = 'Invalid password'
    }

    // change the page to the success page
    if(!isValid)
        forgotPassword.textContent = 'forgot password?'


    // clear timeouts if any
    for(let timeout of previousTimeouts){
        clearTimeout(timeout);
    }
    previousTimeouts = []

    const timeoutId = setTimeout(() => {
            usernameError.textContent = '';
            passwordError.textContent = ''
            
    }, 8000);  
    
    previousTimeouts.push(timeoutId);
    
    return isValid;
}



// go to the next page
document.querySelectorAll('.go-to-question-page').forEach(navigator => {
    navigator.addEventListener('click', ()=>{
        window.location.href = 'question.html'
    })
});