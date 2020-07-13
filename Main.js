/* game variables */

var pitch_compare_computer = "leer"
var highscore = 0
var randomNumber1 = 0
var randomNumber2 = 0
var timeout_duration = 1000
var audio_correct = new Audio ("sounds/correct.wav")
var audio_false = new Audio("sounds/false.wav");
var audio_levelup = new Audio("sounds/levelup.wav")
var pitch_compare_user = "empty"
var canvas_width = 500 
var streak_counter = 0
var streak_highest = 0

/* special colors */

const red = "#dd4a4a"
const blue ="#2778ab"
var dot_color = red

/* defining keys */

var key_1 = {name:"C4", 	pitch:13, audiosource:"sounds/C4.wav", 	position_x:19+canvas_width/14*7, position_y:180};
var key_2 = {name:"Dis4", 	pitch:15, audiosource:"sounds/Dis4.wav", position_x:31+251+44, position_y:100};
var key_3 = {name:"Fis4", 	pitch:18, audiosource:"sounds/Fis4.wav", position_x:31+251+105, position_y:100};

/* defining highscore bar */

var bar1 = document.getElementById('myItem1').ldBar;
var level_counter = 1
streak_aim = 3


var the_bar = document.getElementById("myItem1");
the_bar.style.visibility = 'hidden';



function update_streak_aim(){

if (streak_counter >= streak_aim) {


		streak_aim = streak_aim*1.3 
		streak_counter = 0
		level_counter += 1
		audio_levelup.play();


	

	}

}

function update_level_label(){
	document.getElementById("Level").innerHTML="Level "+level_counter
}

function printToFeedbackBar(stringToPrint){
	document.getElementById('feedbackbar').innerHTML = stringToPrint	
}


function draw_klaviatur(){

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d")
	var img = document.getElementById("klaviatur_image")
	context.drawImage(img, 0, 0, 500, 200);}

draw_klaviatur()

// this code was taken from https://www.w3schools.com/tags/canvas_arc.asp
function draw_dot(x,y) { 

	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(x, y, 11, 0, 2 * Math.PI);

	ctx.fillStyle = dot_color;
	ctx.fill();
	}

	draw_klaviatur()

	function showDivs() {
	  var DivMain = document.getElementById("DivMain");
	  var DivHello = document.getElementById("DivHello");
	  var DivLogo = document.getElementById("DivLogo")

	  DivMain.style.display = "block";
	  DivHello.style.display = "none";
	  DivLogo.style.display = "block";

	}
 	

function main() {



	draw_klaviatur()
	showDivs() 	// unhiding the game area

	// Create First Key

	RandomNumber1 = Math.floor(Math.random()*3)+1

	if (RandomNumber1 == 1) {first_key = key_1}
	if (RandomNumber1 == 2) {first_key = key_2}
	if (RandomNumber1 == 3) {first_key = key_3}

	var audio1 = new Audio(first_key.audiosource);
	audio1.play();

	// Create Second Key

	setTimeout(function(){

		RandomNumber2 = Math.floor(Math.random()*3)+1
		
		if (RandomNumber2 == 1){second_key = key_1}
		if (RandomNumber2 == 2) {second_key = key_2}
		if (RandomNumber2 == 3) {second_key = key_3}

		var audio2 = new Audio(second_key.audiosource);
		audio2.play();

	// Checking the pitch of the key and compare it with what user said

		if (first_key.pitch>second_key.pitch) {pitch_compare_computer = "lower"} 
		else if (first_key.pitch<second_key.pitch) {pitch_compare_computer = "higher"} 
		else if (first_key.pitch = second_key.pitch){pitch_compare_computer = "equal"}
		
	}, timeout_duration);
}

function playSoundAgain(){

	var audio1 = new Audio(first_key.audiosource);
	audio1.play();

	setTimeout(function(){ 		
		var audio2 = new Audio(second_key.audiosource);
		audio2.play();

	}, timeout_duration*1.2);																// Pausezeit erhöhen
}

function visualize_keys(){

	var audio1 = new Audio(first_key.audiosource);
	audio1.play();
	dot_color = red
	draw_dot(first_key.position_x,first_key.position_y)

	setTimeout(function(){ 

		var audio2 = new Audio(second_key.audiosource);
		audio2.play();
		dot_color = blue
		draw_dot(second_key.position_x,second_key.position_y)

	}, timeout_duration);

	setTimeout(function(){ main(); }, 2000);
}

function check_answer(){

		if (pitch_compare_user == pitch_compare_computer)
	{
		printToFeedbackBar("Deine Antwort ist richtig! Weiter geht's!")
		highscore += 1 
		audio_correct.play();
		visualize_keys();

		the_bar = document.getElementById("myItem1");
		the_bar.style.visibility = 'visible'

		streak_counter += 1;
		update_streak_aim();

		if (streak_counter >= streak_highest) {streak_highest = streak_counter}
	
		bar1.set(streak_counter*100/streak_aim);
		update_level_label();

	}	else {

		printToFeedbackBar("Leider falsch! ")
		audio_false.play();
		streak_counter = 0;
		bar1.set(0);
	
		setTimeout(function(){ 
		 }, timeout_duration);

	}
}

function setUserChoiceToHigher(){
	pitch_compare_user = "higher"
	check_answer()
}

function setUserChoiceToLower(){
	pitch_compare_user = "lower"
	check_answer()
}

function setUserChoiceToEqual(){
	pitch_compare_user = "equal"
	check_answer()
}
