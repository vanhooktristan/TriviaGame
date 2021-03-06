// Tristan Van Hook
// Pixar Trivia Game
// KU Coding Bootcamp 2018

// create object that holds all trivia questions, answer selection, correct answer

var triviaQuestions = [{
	question: "In what year was Pixar founded?",
	answerList: ["1979", "1986", "1995", "2000"],
	answer: 1
},{
	question: "Which tech mogul provided funding and became a co-founder of Pixar?",
	answerList: ["Steve Jobs", "Bill Gates", "Peter Thiel", "Mark Zuckerberg"],
	answer: 0
},{
	question: "What was Pixar's first feature-length film that was released in 1995?",
	answerList: ["Toy Story", "A Bug's Life", "Monster's Inc", "Finding Nemo"],
	answer: 0
},{
	question: "Who was the first Pixar character added to the Disney Princess line-up?",
	answerList: ["Jessie", "Repunzel", "Merida", "Elsa"],
	answer: 2
},{
	question: "What's the name of Pixar's first short film, also known as their mascot?",
	answerList: ["Lampo", "Junior", "Pixie", "Luxo Jr."],
	answer: 3
},{
	question: "How many sequels does Pixar currently have released? (as of August 2016)",
	answerList: ["5", "3", "6", "9"],
	answer: 0
},{
	question: "Which film won Pixar's first Academy Award for Best Animated Feature?",
	answerList: ["Toy Story", "Finding Nemo", "Up", "Wall-E"],
	answer: 1
},{
	question: "Who directed Pixar's first three feature films?",
	answerList: ["Peter Docter", "Brad Bird", "John Lasseter", "Peter Sohn"],
	answer: 2
},{
	question: "Who voiced Sadness in 'Inside Out'?",
	answerList: ["Amy Poehler", "Phyllis Smith", "Mindy Kaling", "Phyllis Vance"],
	answer: 1
},{
	question: "Billy Crystal voices Mike Wazowski in 'Monster, Inc.' but what role did he originally turn down from Pixar?",
	answerList: ["Bulls-Eye", "Woody", "Marlin", "Buzz Lightyear"],
	answer: 3
},{
	question: "The voice of WALL-E, Ben Burtt, also voiced what other famous robot?",
	answerList: ["R2-D2", "Alpha 5", "C-3PO", "BB-8"],
	answer: 0
},{
	question: "Brad Bird directed which animated film prior to taking on 'The Incredibles'?",
	answerList: ["The Brave Little Toaster", "The Iron Giant", "Tarzan", "The Prince of Egypt"],
	answer: 1
},{
	question: "Pixar was originally a division of which studio?",
	answerList: ["Dreamworks", "Industrial Light & Magic", "Disney", "Lucasfilm"],
	answer: 3
},{
	question: "What is the name of the famous explorer from 'Up' that Carl looked up to as a boy?",
	answerList: ["Charles F. Muntz", "Chuck M. James", "Charlie Rose", "Carl Carlton"],
	answer: 0
},{
	question: "'A Bug's Life' was loosely based on what other film?",
	answerList: ["I Live in Fear", "Rashomon", "Seven Samurai", "Magneficent Seven"],
	answer: 2
}];

// create array of gifs, one for every question(15)

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];

// create variable for every possible situation for game: current question, correct answer, incorrect answer
// create varibale for the timer: seconds, time
// create variable answered and unanswered
// create varibale for answered selection
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;

// create alert message for correct, incorrect, out of time and finished
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "You are out of time!",
	finished: "Here are you results!!"
}

// -------------------------------

// create function for the start button and embed newGame function to start timer and generate questions
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// create function for start over button
$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// --------------------------------

// create function for the game itself
function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

// generate new question for the user to select an answer from
function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

// function for the timer to start at the beginning of the game and display the declining time per question
function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

// function displays the seconds remaining until the seconds === 0
function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

// displaying the correct or incorrect response from the user
function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 4000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 4000);
	}	
}

// create function to call scoreboard
function scoreboard(){
	// set all timeLeft, message, correctedAnswer and gif id's to empty.
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}