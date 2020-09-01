function Question(question, choices, answer) {
  this.question = question;
  this.choices = choices;
  this.answer = answer;
}

// ============================ // Prototype Declarations
// ============================
// This functions will display the Question and corresponding choices to the console
Question.prototype.show_questions = function (p_question) {
  p_question.textContent = this.question;
  console.log(this.question);
  for (let i = 0; i < this.choices.length; i++) {
    creating_buttons(i, this.choices);
  }
};

var keepScore = score(); // This is placed here so that the function score will exist before the prototype
// This prototype will check for the answer
Question.prototype.select = function (answer, callback) {
  var sr;
  if (answer === this.answer) {
    console.log('Your answer is CORRECT!');
    sr = callback(true);
  } else if (answer !== this.answer) {
    console.log('Your answer is WRONG.');
    sr = callback(false);
  }
  this.display_score(sr);
};

// This function will display the running score on the console
Question.prototype.display_score = function (score) {
  console.log('Your Current Score is: ' + score);
  console.log('------------------------------');
  score_display.textContent = 'Your current score is: ' + score;
};
//=================
// ================== End of Prototypes

// This are the Question
var num_1 = new Question(
  'What is the biggest planet in our solar system?',
  ['Earth', 'Jupiter', 'Saturn', 'Uranus'],
  1
);
var num_2 = new Question(
  'What is the chemical symbol for the element oxygen?',
  ['H', 'N', 'O', 'Ox'],
  2
);
var num_3 = new Question(
  'What is the 7th element on the periodic table of elements?',
  ['Nitrogen', 'Oxygen', 'Carbon', 'Helium'],
  0
);
var num_4 = new Question(
  'The highest mountain on earth is?',
  ['Mt.Apo', 'Mt. Ridge', 'Mt.Hieghts', 'Mt.Everest'],
  3
);
var num_5 = new Question(
  'The fear of what animal is known as ‘arachnophobia’?',
  ['Flies', 'Cockroach', 'Spider', 'Grasshopper'],
  2
);
var num_6 = new Question(
  'What is the name of the long appendage that hangs from an elephants face?',
  ['Tail', 'Nose', 'Ears', 'Tongue'],
  1
);
var num_7 = new Question(
  'What is the name of the part of the human skeleton which protects our brain?',
  ['Collar Bone', 'Clavicle', 'Ribs', 'Skull'],
  3
);
var num_8 = new Question(
  'What is the name of the closest star to the earth?',
  ['Milkyway', 'Andromeda', 'The Sun', 'The Moon'],
  2
);
const main = document.querySelector('.container');
const start = main.querySelector('.start');
const next = main.querySelector('.next');
const display = main.querySelector('.display_question');
let gameplay = false;
let answer, p_question, score_display, current_question, number, new_gen;
next.style.display = 'none';
start.addEventListener('click', init);
let gen_question = [num_1, num_2, num_3, num_4, num_5, num_6, num_7, num_8];

// ==================================================== Functions starts here

// This function will keep updating the score when the asnwer is correct
function init() {
  if (gameplay === false) {
    new_gen = Object.assign([], gen_question);
    gameplay = true;
    score_display = document.createElement('span');
    score_display.textContent = 'Your current score is: 0';
    main.insertBefore(score_display, main.childNodes[2]);
    // score_display.className = 'score_display'
    next.style.display = 'block';
    start.style.display = 'none';
    next_question(p_question);
  }
}

next.addEventListener('click', function () {
  choose_answer(current_question);
  // new_gen.splice(number, 1);
  new_gen.splice(number, 1);
  terminate();
});

function next_question(p_question) {
  p_question = document.createElement('span');
  display.appendChild(p_question);
  number = Math.floor(Math.random() * new_gen.length);
  console.log(number);
  current_question = new_gen[number];
  current_question.show_questions(p_question);
}

function choose(p_choices) {
  p_choices.addEventListener('click', function (e) {
    if (e.target.matches('button')) {
      answer = parseInt(e.target.dataset.set);
      console.log(answer);
    }
  });
}

function creating_buttons(i, indiv_button) {
  let p_choices = document.createElement('button');
  display.appendChild(p_choices);
  p_choices.textContent = indiv_button[i];
  p_choices.setAttribute('data-set', i);
  p_choices.className = 'choice_button';
  choose(p_choices);
  console.log(i + ' - ' + indiv_button[i]);
}

function choose_answer(current_question) {
  current_question.select(answer, keepScore);
  console.log('next');
}

function score() {
  let sc = 0;
  return function (correct) {
    if (correct) {
      sc++;
    }
    return sc;
  };
}

function terminate() {
  if (new_gen.length === 0) {
    next.style.display = 'none';
    start.style.display = 'block';
    gameplay = false;
    deleteAll();
    console.log('You have finished the game.');
    console.log('Your total score is: ' + keepScore());
  } else {
    deleteAll();
    next_question();
  }
}

function deleteAll() {
  display.innerHTML = null;
}
