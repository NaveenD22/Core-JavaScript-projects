const grid = document.querySelector('.grid')
const btn = document.querySelector('.btn')
const reset = document.querySelector('.reset')
const scoreDisplay = document.getElementById('score')
//grab the Style properties
const blockWidth = 100;
const blockHeight = 20;
const boardWidth=560;
const boardHeight=300;
let timeId
const ballDiameter=20;
let xDirection=- 2
let yDirection=2
let score=0
//user add style and position controlling
const userStartPosition=[230,10]
let userCurrentPosition=userStartPosition;

const ballStartPosition=[270,40]
let ballCurrentPosition=ballStartPosition;

//create Block
class Block {
	constructor(xAxis, yAxis) {
		this.bottomLeft = [xAxis, yAxis];
		this.bottomRight = [xAxis + blockWidth, yAxis]
		this.topLeft = [xAxis, blockHeight + yAxis]
		this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
	}
}
//all my blocks
const blocks = [
	new Block(10, 270),
	new Block(120, 270),
	new Block(230, 270),
	new Block(340, 270),
	new Block(450, 270),
	new Block(10, 240),
	new Block(120, 240),
	new Block(230, 240),
	new Block(340, 240),
	new Block(450, 240),
	new Block(10, 210),
	new Block(120, 210),
	new Block(230, 210),
	new Block(340, 210),
	new Block(450, 210),
]
//draw all my blocks
function addBlock() {
	for (let i = 0; i < blocks.length; i++) {
		const block = document.createElement('div');
		block.classList.add('block');
		block.style.left = blocks[i].bottomLeft[0] + 'px'
		block.style.bottom = blocks[i].bottomLeft[1] + 'px'
		grid.appendChild(block)
	}
}

addBlock()

//add user
const user=document.createElement('div');
user.classList.add('user');
drawUser()
grid.appendChild(user)

//draw the user
function drawUser(){
	user.style.left=userCurrentPosition[0]+'px'
	user.style.bottom=userCurrentPosition[1]+'px'
}

//move user
function moveUser(e){
	switch(e.key){
		case'ArrowLeft':
			if(userCurrentPosition[0] > 0){
				userCurrentPosition[0] -= 10
				drawUser()
			}
			break;
		case 'ArrowRight':
			if(userCurrentPosition[0] < boardWidth - blockWidth){
				userCurrentPosition[0] += 10
				drawUser()
			}
			break;
	}
}

document.addEventListener('keydown', moveUser)

//draw the ball
function drawBall(){
	ball.style.left=ballCurrentPosition[0] + 'px';
	ball.style.bottom=ballCurrentPosition[1] + 'px';
}

//add ball
const ball=document.createElement('div');
ball.classList.add('ball');
drawBall()
grid.appendChild(ball)

//move the ball 
function moveball(){
	ballCurrentPosition[0] += xDirection
	ballCurrentPosition[1] += yDirection
	drawBall()
	checkCollision()
}
btn.addEventListener('click',()=>{

	timeId=setInterval(moveball,30)
})

//check for collisions
function checkCollision(){
	//check for ball collision
	for(let i =0 ; i < blocks.length;i++){
		if(
			(ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
			ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
			((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]  )
		){
			const allBlocks=Array.from(document.querySelectorAll('.block'))
			allBlocks[i].classList.remove('block')
			blocks.splice(i,1)
			score++
			changeDirection()
			scoreDisplay.innerText=score
		}
	}
	//Win check 
	if(blocks.length == 0){
		score='You Win'
		scoreDisplay.innerHTML=score
		document.removeEventListener('keydown',moveUser)
		clearInterval(timeId)
	}
	//check for wall collissions
	if(ballCurrentPosition[0] >= (boardWidth-ballDiameter) ||
		ballCurrentPosition[1] >= (boardHeight-ballDiameter) ||
		ballCurrentPosition[0] <= 0
		)
			{
				changeDirection()
			}

			//check user collision
			if((ballCurrentPosition[0] > userCurrentPosition[0] && ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth) &&
			(ballCurrentPosition[1] > userCurrentPosition[1] && ballCurrentPosition[1] < userCurrentPosition[1] + blockHeight)){
				changeDirection()
			}
			//check for game over
		if(ballCurrentPosition[1] <= 0){
			clearInterval(timeId)
			scoreDisplay.innerHTML= 'You Lose'
			document.removeEventListener('keydown',moveUser)
		}
}
function changeDirection(){
		if(xDirection == 2 && yDirection == 2){
			yDirection= -2
			return
		}
		if (xDirection == 2 && yDirection == -2){
			xDirection= -2
			return
		}
		if(xDirection == -2 && yDirection == -2){
			yDirection=2
			return
		}
		if(xDirection == -2 && yDirection== 2){
			xDirection=2
		}
}
reset.addEventListener('click',()=>{
	location.reload()
})