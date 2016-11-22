var canvas;
var canvasContext;

var ballX = 0;
var ballY = 150;

var wallY = 250;
var wallY_2 = 250;

var ballSpeedX = 10;
var ballSpeedY = 5;

var framesPerSecond = 30;

var player1Score = 0;
var player2Score = 0;
var scoreToWin = 5;

endGameScreen = false;

const PADDLE_TOP = 100

// MAIN FUNCTION
// MAIN FUNCTION
// MAIN FUNCTION
window.onload = function(){
	canvas = document.getElementById('pong');
	canvasContext = canvas.getContext('2d');
	setInterval(function(){
		if(endGameScreen){
			return false;
		}
		move();
		drawEverything();
	},1000/framesPerSecond);

	canvas.addEventListener('mousemove',function(evt){
		var mousePos = calculateMousePos(evt);
		wallY = mousePos.Y - (PADDLE_TOP/2);
	})

	canvas.addEventListener('mousedown',handleMouseClick);

}

function handleMouseClick(evt){
	if(endGameScreen){
		player1Score = 0;
		player2Score = 0;
		endGameScreen = false;
	}
}

function ballReset(){

		if(player1Score >= scoreToWin  || player2Score >=  scoreToWin){
		endGameScreen = true;
		}

		ballSpeedX = -ballSpeedX;
		ballX = canvas.width/2;
		ballY = canvas.height/2;
}

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		X: mouseX,
		Y: mouseY
	}
}

function computerMove(){
	var paddleCenter = wallY_2 + (PADDLE_TOP/2);
	
		if(ballY-45 > paddleCenter){
			wallY_2 += 10;
		}
		else if((ballY-45 < paddleCenter)){
			wallY_2 -= 10;
		}
	
}

function move(){

	computerMove();

	ballX += ballSpeedX;
	ballY += ballSpeedY;
	if(ballX > canvas.width){
		if(ballY > wallY_2 && ballY < wallY_2 + PADDLE_TOP){
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (wallY_2 + PADDLE_TOP/2);
			ballSpeedY = deltaY * 0.35;
		}
		else{
			player1Score++;	
			ballReset();
		}	
	}
	if(ballX < 0){
		if(ballY > wallY && ballY < wallY + PADDLE_TOP){
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (wallY + PADDLE_TOP/2);
			ballSpeedY = deltaY * 0.35;
		}
		else{
			player2Score++;			
			ballReset();
		}
	}
	if(ballY > canvas.height){
		ballSpeedY = -ballSpeedY;
	}
	if(ballY < 0){
		ballSpeedY = -ballSpeedY;
	}
}

function drawMiddleLine(){
	for(var i = 0; i < canvas.height; i += 40){
		drawObject((canvas.width/2)-1,i,2,20,'white');
	}
}

function drawEverything(){

	drawObject(0,0,canvas.width,canvas.height,'black');

	if(endGameScreen){
		
		canvasContext.fillStyle = 'white';
		canvasContext.font = 'italic 13pt Calibri';
			if(player1Score >= scoreToWin){
			canvasContext.fillText('Left Player wins. Click to continue',300,250);
			}
			else if(player2Score >= scoreToWin){
			canvasContext.fillText('Right Player wins. Click to continue',300,250);		
			}
			return;
	}
		
		drawMiddleLine();
		drawObject(0, wallY,10,PADDLE_TOP,'white');
		drawObject(790, wallY_2,10,PADDLE_TOP,'white');
		drawCircle(ballX,ballY,10,0,Math.PI*2,true,'white');
		canvasContext.fillText(player1Score,100,50);
		canvasContext.fillText(player2Score,canvas.width-100,50);
	
}

function drawObject(leftX,topY,width, height, color){
	canvasContext.fillStyle = color;
	canvasContext.fillRect(leftX,topY,width, height);
}
function drawCircle(leftX, topY,width, height, size, something,color){
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(leftX,topY,width,height,size,something);
	canvasContext.fill();
}