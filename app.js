class Quiz {
    constructor() {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded(){
        return this.questionIndex === this.questions.length;
    }
}

class Question {
    constructor(text, choice, answer) {
        this.text = text;
        this.choice = choice;
        this.answer = answer;
    }

    isCorrectAnswer(choice){
        return this.answer === choice;
    }
}

let questions = [
    new Question(
        "Язык разметки гипертекста это?", ["JQuery", "XHTML", "CSS", "HTML"], "HTML"
    ),
    new Question(
        "Каскадная таблица стилей это?", ["HTML", "JQuery", "CSS", "XML"], "CSS"
    ),
    new Question(
        "Framework JavaScript ?", ["React", "Laravel", "Django", "Sass"], "React"
    ),
    new Question(
        "Какой язык серверный?", ["PHP", "HTML", "React", "All"], "PHP"
    ),
    new Question(
        "Какой язык лучше для создания искусственного интеллекта?", ["React", "Laravel", "Python", "Sass"], "Python"
    )
];

//появление вопросов
function displayQuestion(){
    if(quiz.isEnded()) {
        showScores();
    } else {
        //выводим вопрос
        let question = document.querySelector('#question');
        question.innerHTML = quiz.getQuestionIndex().text;

        //создаем варианты ответов
        let choices = quiz.getQuestionIndex().choice;// arr
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.querySelector('#choice' + i);
            choiceElement.innerHTML = choices[i];
            guess('#btn' + i, choices[i]);
            // console.log(choices[i]);
        }
        showProgress();
    }
}

//отгадывание вопросов
function guess(id, guess) {
    let button = document.querySelector(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

//прогресс
function showProgress(){
    let curretnQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.querySelector('#progress');
    progressElement.innerHTML = 
    `Вопрос №${curretnQuestionNumber} из ${quiz.questions.length}`
}

//окончание теста
function showScores(){
    let quizEndHTML =
        `
            <h1>Тест закончился</h1>
            <h2 id='score'>Твой результат: ${quiz.score} из ${quiz.questions.length}</h2>
            <div class='quiz-repeat'>
                <a href='index.html'>Пройти тест ещё раз</a>
            </div>
        `
    let quizElement = document.querySelector('#quiz');
    quizElement.innerHTML = quizEndHTML;
}

let quiz = new Quiz(questions);

displayQuestion();

let time = 1,
    quizTimeMinutes = time * 3600,
    quizTime = quizTimeMinutes / 60,
    counting = document.querySelector('#count-down');

function startCountDown(){
    let quizTimer = setInterval(()=>{
        if (quizTime <=0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60),
                min = Math.floor(quizTime / 60) % 60;
            
            counting.innerHTML = `Время: ${addZero(min)} : ${addZero(sec)}`;
        }
    }, 1000)
}

function addZero(t){
    return t < 10 ? '0' + t : t;
}

startCountDown();