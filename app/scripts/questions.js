let questions = document.querySelectorAll('.views__firewatch2-Question'),
    buttonQuestions =  document.querySelector('.views__firewatch2-button'),
    index = 0,
    questionsLength = questions.length;
    ;

buttonQuestions.addEventListener('click', showNext);

function showNext() {
    if(index==(questionsLength-1)) {
        console.log('hey');
        questions[index].classList.add('hidden');
        questions[0].classList.remove('hidden');
        index=0;
    } else {
        questions[index].classList.add('hidden');
        questions[index+1].classList.remove('hidden');
        index++;
    }
}