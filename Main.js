/* game variables */

var pitch_compare_user = "none"
var pitch_compare_computer = "none"
var highscore 	  = 0
var randomNumber1 = 0
var randomNumber2 = 0
var timeout_duration = 1000
var audio_correct 	= new Audio("sounds/correct.mp3") // preloading audio we use often
var audio_false 	= new Audio("sounds/false.mp3");
var audio_levelup 	= new Audio("sounds/levelup.mp3")


var canvas_width   = 500 
var canvas_height  = 200
var streak_counter = 0
var streak_highest = 0

var bk 	= canvas_height/2 						// y-position of Black Key
var wk 	= canvas_height*0.9						// y-position of White Key
var po1 = canvas_width/24-5						// position of 1. Octave
var po2 = canvas_width/24+(canvas_width/2)-7	// position of 2. Octave
var wkw = canvas_width/14						// width of a white key
var bkw = canvas_width/24						// width of a black key

/* custom colors */

const 	red = "#dd4a4a"
const 	blue ="#2778ab"
var 	dot_color = red



/* defining keys */
var key_1 	= {name:"C3", 	pitch:1, audiosource:"sounds/C3.mp3", 	position_x:po1, 			position_y:wk};
var key_2 	= {name:"Cis3",	pitch:2, audiosource:"sounds/Cis3.mp3",	position_x:po1+bkw, 		position_y:bk};
var key_3 	= {name:"D3", 	pitch:3, audiosource:"sounds/D3.mp3", 	position_x:po1+wkw*1, 		position_y:wk};
var key_4 	= {name:"Dis3", pitch:4, audiosource:"sounds/Es3.mp3",  position_x:po1+wkw*1+bkw, 	position_y:bk};
var key_5 	= {name:"E3",	pitch:5, audiosource:"sounds/E3.mp3",	position_x:po1+wkw*2, 		position_y:wk};
var key_6 	= {name:"F3",	pitch:6, audiosource:"sounds/F3.mp3",	position_x:po1+wkw*3, 		position_y:wk};
var key_7 	= {name:"Fis3", pitch:7, audiosource:"sounds/Fis3.mp3", position_x:po1+wkw*4-bkw,	position_y:bk};
var key_8 	= {name:"G3", 	pitch:8, audiosource:"sounds/G3.mp3", 	position_x:po1+wkw*4, 		position_y:wk};
var key_9 	= {name:"Gis3", pitch:9, audiosource:"sounds/Gis3.mp3", position_x:po1+wkw*4+bkw,	position_y:bk};
var key_10 	= {name:"A3", 	pitch:10, audiosource:"sounds/A3.mp3", 	position_x:po1+wkw*5, 		position_y:wk};
var key_11 	= {name:"Bb3", 	pitch:11, audiosource:"sounds/Bb3.mp3", position_x:po1+wkw*5+bkw,	position_y:bk};
var key_12 	= {name:"H3", 	pitch:12, audiosource:"sounds/H3.mp3", 	position_x:po1+wkw*6, 		position_y:wk};
var key_13 	= {name:"C4", 	pitch:13, audiosource:"sounds/C4.mp3", 	position_x:po2, 			position_y:wk};
var key_14 	= {name:"Cis4",	pitch:14, audiosource:"sounds/Cis4.mp3",position_x:po2+bkw,			position_y:bk};
var key_15 	= {name:"D4", 	pitch:15, audiosource:"sounds/D4.mp3", 	position_x:po2+wkw*1, 		position_y:wk};
var key_16 	= {name:"Dis4", pitch:16, audiosource:"sounds/Es4.mp3", position_x:po2+wkw*1+bkw, 	position_y:bk};
var key_17 	= {name:"E4",	pitch:17, audiosource:"sounds/E4.mp3",	position_x:po2+wkw*2, 		position_y:wk};
var key_18 	= {name:"F4", 	pitch:18, audiosource:"sounds/F4.mp3",	position_x:po2+wkw*3, 		position_y:wk};
var key_19 	= {name:"Fis4", pitch:19, audiosource:"sounds/Fis4.mp3",position_x:po2+wkw*3+bkw, 	position_y:bk};
var key_20 	= {name:"G4", 	pitch:20, audiosource:"sounds/G4.mp3", 	position_x:po2+wkw*4, 		position_y:wk};
var key_21 	= {name:"Gis4", pitch:21, audiosource:"sounds/Gis4.mp3",position_x:po2+wkw*4+bkw, 	position_y:bk};
var key_22 	= {name:"A4", 	pitch:22, audiosource:"sounds/A4.mp3", 	position_x:po2+wkw*5, 		position_y:wk};
var key_23 	= {name:"Bb4", 	pitch:23, audiosource:"sounds/Bb4.mp3", position_x:po2+wkw*5+bkw, 	position_y:bk};
var key_24 	= {name:"H4", 	pitch:24, audiosource:"sounds/H4.mp3", 	position_x:po2+wkw*5, 		position_y:wk};


/* defining highscore bar */

var bar1 = document.getElementById('myItem1').ldBar;
var level_counter = 1
streak_aim = 3


var the_bar = document.getElementById("myItem1"); the_bar.style.visibility = 'hidden';


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

	RandomNumber = Math.floor(Math.random()*22)+1 // reset to 3


	first_key = random_key(randomNumber1);
	
function random_key() {

	switch (RandomNumber) {
	   case 1: 	return key_1; 	break;
	   case 2: 	return key_2; 	break;
	   case 3: 	return key_3; 	break;
	   case 4: 	return key_4; 	break;
	   case 5: 	return key_5; 	break;
	   case 6: 	return key_6; 	break;
	   case 7: 	return key_7; 	break;
	   case 8: 	return key_8; 	break;
	   case 9: 	return key_9; 	break;
	   case 10: return key_10; 	break;
	   case 11: return key_11; 	break;
	   case 12: return key_12; 	break;
	   case 13: return key_13; 	break;
	   case 14: return key_14; 	break;
	   case 15: return key_15; 	break;
	   case 16: return key_16; 	break;
	   case 17: return key_17; 	break;
	   case 18: return key_18; 	break;
	   case 19: return key_19; 	break;
	   case 20: return key_20; 	break;
	   case 21: return key_21; 	break;
	   case 22: return key_22; 	break;

	 }
}

	var audio1 = new Audio(first_key.audiosource);
	audio1.play();

	// Create Second Key

	setTimeout(function(){

		RandomNumber = Math.floor(Math.random()*22)+1
		second_key = random_key()

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

	}, timeout_duration*1.4);			
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

draw_klaviatur()
