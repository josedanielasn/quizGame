function Question(question, choices, answer) {
  this.question = question;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.print_question = function () {
  let create_span = document.createElement('span');
  display.appendChild(create_span);
  create_span.textContent = this.question;
  for (let i = 0; i < this.choices.length; i++) {
    creating_buttons(i, this.choices);
  }
};

Question.prototype.select = function () {
  ans = this.answer;
  display.addEventListener('click', function (e) {
    if (e.target.matches('button')) {
      console.log(ans);
      let sr;
      let number_ans = parseInt(e.target.dataset.set);
      if (gameplay === true) {
        if (number_ans === ans) {
          sr = keepScore(true);
          display
            .querySelector('.choice_button_' + number_ans)
            .classList.add('correct');
        } else if (number_ans !== ans) {
          sr = keepScore(false);
          display
            .querySelector('.choice_button_' + number_ans)
            .classList.add('wrong');
          display
            .querySelector('.choice_button_' + ans)
            .classList.add('correct');
        }
        score_dis.querySelector('.score_number').innerHTML = sr;
        next.classList.remove('freeze');
        terminate();
        gameplay = false;
        next_button = true;
      }
    }
  });
};

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

let set_question = [num_1, num_2, num_3, num_4, num_5, num_6, num_7, num_8];
let clone_question, gameplay, number, ans, next_button, restart_btn;
const main = document.querySelector('.container');
const start = main.querySelector('.start');
const next = main.querySelector('.next');
const end = main.querySelector('.end');
const score_dis = main.querySelector('.score');
const question_pro = main.querySelector('.question');
const title = main.querySelector('.title');
const display = main.querySelector('.display_question');
const progress = main.querySelector('.progress');

start.addEventListener('click', start_game);
next.addEventListener('click', gen_question);
end.addEventListener('click', last_display);

function start_game() {
  restart_btn = 'restart';
  score_dis.querySelector('.score_number').innerHTML = 0;
  clone_question = Object.assign([], set_question);
  manipulate_theButtons();
  gen_question();
}

function gen_question() {
  if (next_button === true) {
    next_button = false;
    next.classList.add('freeze');
    display.innerHTML = null;
    number = Math.floor(Math.random() * clone_question.length);
    question_pro.innerHTML = 'Question: ' + (9 - clone_question.length) + '/8';
    progress.style.width = (9 - clone_question.length) * 20 + 'px';
    clone_question[number].print_question();
    clone_question[number].select();
  }
}

function creating_buttons(i, indiv_button) {
  let p_choices = document.createElement('button');
  display.appendChild(p_choices);
  p_choices.textContent = indiv_button[i];
  p_choices.setAttribute('data-set', i);
  p_choices.className = 'choice_button_' + i;
  console.log(i + ' - ' + indiv_button[i]);
  gameplay = true;
}

function terminate() {
  clone_question.splice(number, 1);
  if (clone_question.length === 0) {
    last_display();
  }
}

let keepScore = score();

function score() {
  let sc = 0;
  return function (correct) {
    if (correct) {
      sc++;
    }
    return sc;
  };
}

function removeAdd_nextButton() {
  next.classList.toggle('next');
}

function manipulate_theButtons() {
  score_dis.classList.toggle('scoreJ');
  title.classList.toggle('titleJ');
  start.classList.toggle('startJ');
  end.classList.toggle('end');
  next_button = true;
  removeAdd_nextButton();
}

function last_display() {
  if (restart_btn === 'restart') {
    console.log('end');
    display.innerHTML = null;
    end.innerHTML = 'Finish';
    display.innerHTML = `Congratulations! <br> Your Score is: ${keepScore()}`;
    display.classList.add('winning');
    removeAdd_nextButton();
    restart_btn = 'end';
  } else if (restart_btn === 'end') {
    restart_game();
  }
}

function restart_game() {
  display.innerHTML = null;
  display.classList.remove('winning');
  end.innerHTML = 'End Quiz';
  manipulate_theButtons();
  removeAdd_nextButton();
  restart_btn = 'restart';
}
