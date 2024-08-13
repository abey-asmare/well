const questions = [
    {
        question:`
            <p class="question">
                I'm looking for a provider that will provide...
            </p>
            <select type="dropdown" name="country" class="input dropdown" id="js-country" title="Country has to be provided" required autocomplete="country">
                <option value="anxiety-therapy">anxiety therapy</option>
                <option value="family-therapy">family therapy</option>
            </select>

            <button class="btn primary btn-md">Continue</button>
    `,
    answer: null
    },
    {
        question: `
            <p class="question">
                Have you and your partner worked with a couples counselor before?
            </p>
           
           <div class="choice">
               <button class="btn btn-outlined yes" role="radio">Yes</button>
               <button class="btn btn-outlined no" role="radio">No</button>
           </div>

    `,
    answer: null
    }, 
   {
    question:  `
    <p class="question">
        I'm looking for a provider that will provide...
    </p>
    <select type="dropdown" name="country" class="input dropdown" id="js-country" title="Country has to be provided" required autocomplete="country">
        <option value="anxiety-therapy">anxiety therapy</option>
        <option value="usa">family therapy</option>
    </select>

    <button class="btn primary btn-md">Continue</button>
`,
answer: null
}
]

let questionIndex = 0, currentQuestion;
const questionContainer = document.querySelector('.js-question-container');
const backBtn = document.querySelector('.back-btn');
const progressBar = document.querySelector('.js-progress-bar');

function renderQuestion(index){
    currentQuestion = questions[index]
    if(questionIndex === 0){
        backBtn.classList.add('disabled');
        backBtn.setAttribute('disabled', '')
    }else{
        backBtn.classList.remove('disabled');
        backBtn.removeAttribute('disabled', '')

    }
    questionContainer.innerHTML = currentQuestion.question;
    document.querySelectorAll('.js-question-container .btn').forEach(btn =>{
        btn.addEventListener('click', ()=>{
            const selectElem = document.querySelector('select');
            if(selectElem){ // if the quesion is select based get the input value
                currentQuestion.answer = selectElem.value
                // console.log(currentQuestion.answer)
            }else{
                currentQuestion.answer = btn.textContent
                // console.log(currentQuestion.answer)
            }
            if (index < questions.length - 1) {
                changeQuestion();
            } else {
                progressBar.style.width = `100%`;
                setTimeout(() => {
                    window.location.href = 'index.html'
                }, 600)
            }
        })
    })
}


function changeQuestion(){
    renderQuestion(++questionIndex);
    updateProgressBar();    
    questionContainer.classList.add('slide-in');
    setTimeout(() => {
    questionContainer.classList.remove('slide-in')
    questionContainer.classList.remove('slide-out')
        
    }, 600);
}

function previousQuestion(){
    if(questionIndex > 0){
        backBtn.classList.remove('disabled')
        renderQuestion(--questionIndex);
        questionContainer.classList.add('slide-out')
        questionContainer.classList.remove('slide-in')
        updateProgressBar();

        
        setTimeout(() => {
        questionContainer.classList.remove('slide-in')
        questionContainer.classList.remove('slide-out')
            
        }, 600);
    }
}

function updateProgressBar() {
    progressBar.style.width = `${(questionIndex / questions.length) * 100}%`;
}

backBtn.addEventListener('click', () => {
    questionContainer.classList.remove('slide-in')
    questionContainer.classList.add('slide-out')
    previousQuestion();
});

renderQuestion(questionIndex);