const main = document.querySelector('.container');
const start = main.querySelector('.start');
const end = main.querySelector('.end');

var set = [];
// var gameplay = true;
var score = 0;
list_questions();
startGame();

function questions(question, choices, answer) {
  this.question = question;
  this.choices = choices;
  this.answer = answer;
  this.select = function () {
    let answer = window.prompt('Number corresponding to your answer:');
    // if (1 === this.choices.indexof){}
    let correct_num = this.choices.indexOf(this.answer) + 1;
    // console.log(answer);
    if (answer == correct_num) {
      console.log('Your answer is CORRECT!');
      score = score + 1;
      console.log('Your score is now = ' + score);
      if (set.length === 0) {
        console.log('Congratulations, you finished the quiz.');
      } else {
        gen_question();
      }
    } else if (set.length !== correct_num) {
      console.log('Your answer is WRONG.');
      if (set.length === 0) {
        console.log('Congratulations, you finished the quiz.');
      } else {
        gen_question();
      }
    }
  };
}

function list_questions() {
  let num_1 = new questions(
    // 1,
    'What is the biggest planet in our solar system?',
    ['Earth', 'Jupiter', 'Saturn', 'Uranus'],
    'Jupiter'
  );
  let num_2 = new questions(
    // 2,
    'What is the chemical symbol for the element oxygen?',
    ['H', 'N', 'O', 'Ox'],
    'O'
  );
  let num_3 = new questions(
    // 3,
    'What is the 7th element on the periodic table of elements?',
    ['Nitrogen', 'Oxygen', 'Carbon', 'Helium'],
    'Nitrogen'
  );
  let num_4 = new questions(
    // 4,
    'The highest mountain on earth is?',
    ['Mt.Apo', 'Mt. Ridge', 'Mt.Hieghts', 'Mt.Everest'],
    'Mt.Everest'
  );
  let num_5 = new questions(
    // 5,
    'The fear of what animal is known as ‘arachnophobia’?',
    ['Flies', 'Cockroach', 'Spider', 'Grasshopper'],
    'Spider'
  );
  let num_6 = new questions(
    // 6,
    'What is the name of the long appendage that hangs from an elephants face?',
    ['Tail', 'Nose', 'Ears', 'Tongue'],
    'Nose'
  );
  let num_7 = new questions(
    // 7,
    'What is the name of the part of the human skeleton which protects our brain?',
    ['Collar Bone', 'Clavicle', 'Ribs', 'Skull'],
    'Skull'
  );
  let num_8 = new questions(
    // 8,
    'What is the name of the closest star to the earth?',
    ['Milkyway', 'Andromeda', 'The Sun', 'The Moon'],
    'The Sun'
  );

  set = [num_1, num_2, num_3, num_4, num_5, num_6, num_7, num_8];
}

function gen_question() {
  var question_number = set[Math.floor(Math.random() * set.length)];
  set.splice(set.indexOf(question_number), 1);
  console.log(question_number.question);
  console.log(set.length);
  question_number.choices.forEach(function (set, index) {
    console.log(index + 1 + '-' + set);
  });
  question_number.select();
}

end.addEventListener('click', function () {
  console.log('You ended the quiz.');
});

function startGame() {
  start.addEventListener('click', function () {
    // if (gameplay === true){
    console.log('start');
    gen_question();
    // gameplay = false
  });
}
