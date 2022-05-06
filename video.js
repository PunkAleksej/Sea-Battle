let shipChoice = 4;
let vertical = true
let stagePlanning = true;
let gameMap1 = Array(100).fill(0);
let gameMap2 = Array(100).fill(0);
let start = false;
let gameMap;
let ships;
let player = true
let ships1 = {
	0: [],
	1: [4],
	2: [3],
	3: [2],
	4: [1],
	"attaked": [],
    "dead": [],
    "miss":[],
}

let ships2 = {
	0: [],
	1: [4],
	2: [3],
	3: [2],
	4: [1],
	"attaked": [],
    "dead": [],
    "miss":[],
}






const newGame = document.querySelector(".newGame");
newGame.addEventListener("click", function (event) {
	gameMap1 = Array(100).fill(0);
	gameMap2 = Array(100).fill(0);
	ships1 = {
		0: [],
		1: [4],
		2: [3],
		3: [2],
		4: [1],
		"attaked": [],
    	"dead": [],
    	"miss":[],
	}
	ships2 = {
		0: [],
		1: [4],
		2: [3],
		3: [2],
		4: [1],
		"attaked": [],
	    "dead": [],
	    "miss":[],
	}
	ships = {
		0: [],
		1: [4],
		2: [3],
		3: [2],
		4: [1],
		"attaked": [],
	    "dead": [],
	    "miss":[],
	}
	mapColor()
	player = !player
	mapColor()
	player = !player
	stagePlanning = true
	shipOpacity()
})

let creator = false;
const creatorMod = document.querySelector(".creatorMod");
creatorMod.addEventListener('click', function(event) {
	creator = !creator
})


const four_decks = document.querySelector(".four_decks");
four_decks.addEventListener("click", function(event) {
	let target = event.target.closest('.four_decks');
	shipChoice = 4
	console.log(shipChoice)
})

const three_decks = document.querySelector(".three_decks");
three_decks.addEventListener("click", function(event) {
	let target = event.target.closest('.three_decks');
	shipChoice = 3
	console.log(shipChoice)
})

const two_decks = document.querySelector(".two_decks");
two_decks.addEventListener("click", function(event) {
	let target = event.target.closest('.two_decks');
	shipChoice = 2
	console.log(shipChoice)
})

const one_decks = document.querySelector(".one_decks");
one_decks.addEventListener("click", function(event) {
	let target = event.target.closest('.one_decks');
	shipChoice = 1
	console.log(shipChoice)
})

const rotate = document.querySelector(".rotate");
rotate.addEventListener("click", function(event) {
	vertical = !vertical
	console.log(vertical)
})






const demonstration = document.querySelector(".demonstration");
demonstration.addEventListener("click", function (event) {
	autoBattle()
})



 const startButton = document.querySelector(".start");
 startButton.addEventListener("click", function (event) {
 	if (ships1[0].length == 20) {
 		start =  true
 		stagePlanning = false
 	} else {
 		console.log('Корабли не расставлены!')
 	}
	console.log(stagePlanning)
})




//blockForMouse.addEventListener("mouseover", function (event) {
//	let target = event.target.closest('span');
	// переход не на <span> - игнорировать
//	if (!target) return;
//	target.style.cssText = `background-color: #77608d;`;
//});

//blockForMouse.addEventListener("mouseout", function (event) {
//	let target = event.target.closest('span');
	// переход не на <span> - игнорировать
//	if (!target) return;
//	target.style.cssText = ``;
//});



// 0 - пустая клетка
// 1 - корабль
// 2 - поля вокруг корабля
// 3 - подбитый корабль
// 4 - потопленный корабль
// 5 - поля вокруг потопленого корабля
// 6 - промах



const first_player = document.querySelector('.first_player');
first_player.addEventListener("click", function (event) {
	let target = +event.target.closest('span').textContent;// target = 00, 01 ... 99


	
	if (gameMap[target] === 0) {
		
		if (stagePlanning) {
			shipCreator(target)
		}
		

	} else if (gameMap[target] !== 0) {
		
		if (stagePlanning) {
			shipDelete(target)
		}
	}	

});


const second_player = document.querySelector('.second_player');
second_player.addEventListener("click", function (event) {
	let target = +event.target.closest('span').textContent;
		if (start) {
			if (ships2["miss"].indexOf(target) === -1 && ships2["attaked"].indexOf(target) === -1) {
				if (ships2[0].length < 20) {
					player = !player
					positionGenerate ()
					player = !player
				}

				shipAttack(target)
				player = false
				
				computerAttack()
				console.log(ships1)
				console.log(ships2)
			}

			
			
		}
});




function mapColor () {

	if (creator) {
		
		let body = document.querySelector('body');
		body.style.cssText = `background: url(pattern.png) repeat;`;
		let panel = document.querySelector('.panel');
		panel.style.cssText = `background: url(pattern.png)`;



		let elements;
	
		if (player) {
			gameMap = gameMap1
			elements = document.querySelectorAll('.first_player > span');
		} else {
			gameMap = gameMap2
			elements = document.querySelectorAll('.second_player > span');
		}
		for (let elem of elements) {
			let i = +(elem.textContent);
			if (gameMap[i] === 0) {
				elem.style.cssText = `font-size: 16px; border-radius: 0px`;
			} else if (gameMap[i] === 1) {
				elem.style.cssText = `background-color: #162b57;font-size: 16px; border-radius: 0px`; //77608d
			} else if (gameMap[i] === 2) {
				elem.style.cssText = `background-color: #9f77f7;font-size: 16px; border-radius: 0px`;
			} else if (gameMap[i] === 3) {
				elem.style.cssText = `background-color: #f52f2f;font-size: 16px; border-radius: 0px`;
			} else if (gameMap[i] === 4) {
				elem.style.cssText = `background-color: #f52f2f;font-size: 16px; border-radius: 0px`;
			} else if (gameMap[i] === 5) {
				elem.style.cssText = `background-color: #f77777;font-size: 16px; border-radius: 0px`;
			} else if (gameMap[i] === 6) {
				elem.style.cssText = `background-color: #bfbcc4;font-size: 16px; border-radius: 0px`;
			}

		}
		endGame()
	} else {

		let body = document.querySelector('body');
		body.style.cssText = `background:url(background.jpg) no-repeat`;
		let panel = document.querySelector('.panel');
		panel.style.cssText = `background: url(panel.webp);background-size: cover;`;

		let elements;
		
		if (player) {
			gameMap = gameMap1
			elements = document.querySelectorAll('.first_player > span');
		} else {
			gameMap = gameMap2
			elements = document.querySelectorAll('.second_player > span');
		}
		for (let elem of elements) {
			let i = +(elem.textContent);
			if (gameMap[i] === 0) {
				elem.style.cssText = ``;
			} else if (gameMap[i] === 1) {
				elem.style.cssText = `border: 8px solid #4a80ed;`;
			} else if (gameMap[i] === 2) {
				elem.style.cssText = ``; //background-color: #9f77f7;background: url(waves.png) no-repeat; background-size: cover;
			} else if (gameMap[i] === 3) {
				elem.style.cssText = `border: 8px solid #4a80ed;; background: url(cross.png) no-repeat; background-size: cover;`;
			} else if (gameMap[i] === 4) {
				elem.style.cssText = `border: 7px solid #f77777; background: url(cross2.png) no-repeat; background-size: cover;`; //background-color: #f52f2f;
			} else if (gameMap[i] === 5) {
				elem.style.cssText = `background:center url(cross.png) no-repeat; background-size: 10px;border: 2px solid #f77777;`; //background-color: #05132e
			} else if (gameMap[i] === 6) {
				elem.style.cssText = `background-color: #bfbcc4; background:center url(circle.png) no-repeat; background-size: 10px;`;
			}

		}
		endGame()
	}

}


function generator (x) {
	gen = []
	for (let i = 0; i <= shipChoice; i++){
			gen.push(x)
			x = x + 1
	}
	return gen	
}

function shipArea (x, y) {
	if (vertical) {
		return shipAreaX(x,y)
	} else {
		return shipAreaY(x,y)
	}
}

function shipAreaY (x, y) {
	let column = []

	if (x === 0 ) {
		column = [x, x + 1]
	} else if (x ===9) {
		column = [x-1, x]
	} else {
		column = [x-1, x, x+1]
	}

	let line = []

	if (y === 0 ) {
		line = generator(y)
	} else if (y + shipChoice > 9) {
		y = 9 - shipChoice
		line = generator(y)
	} else {
		line = generator(y)
		line.push(y-1)
	}

	let area = []

	for (let i of line) {
		for (let k of column)
			area.push(+(String(i) + String(k)))
	}
	
	//console.log(area) //[6, 7, 8, 16, 17, 18, 26, 27, 28]
	return area
}

function shipAreaX (x, y) {
	
	let column = []

	if (x === 0 ) {
		column = generator(x)

	} else if (x + shipChoice > 9) {
		x = 9 - shipChoice
		column = generator(x)
	} else {
		column = generator(x)
		column.push(x-1)
	}
	
	let line = []

	if (y === 0) {
	 	line = [y, y+1]
	} else if (y === 9) {
	 	line = [y-1, y]
	} else {
	 	line = [y-1, y, y+1]
	}



	let area = []

	for (let i of line) {
		for (let k of column)
			area.push(+(String(i) + String(k)))
	}
	
	//console.log(area) //[6, 7, 8, 16, 17, 18, 26, 27, 28]
	return area
}

function shipPosition (x,y) {
	if (vertical) {
		return shipPositionX(x,y)
	} else {
		return shipPositionY(x,y)
	}
}

function shipPositionX(x,y) {
	let column = []
	
	if (x === 0 ) {
		column = generator(x)
		column.pop()
		
	} else if (x + shipChoice > 9) {
		x = 9 - shipChoice
		column = generator(x + 1)
		column.pop()
	} else {
		column = generator(x)
		column.pop()
		
	}
	
	let line = []
	line.push(y)
	let area = []

	for (let i of line) {
		for (let k of column)
			area.push(+(String(i) + String(k)))
	}
	shipCounter(area)
	//console.log(area, column, line) //[6, 7, 8, 16, 17, 18, 26, 27, 28]
	return area
}

function shipPositionY(x,y) {
	let column = []
	column.push(x)
	let line = []
	if (y === 0) {
		line = generator(y)
		line.pop()
	} else if (y + shipChoice > 9) {
		y = 9 - shipChoice
		line = generator(y + 1)
		line.pop()
	} else {
		line = generator(y)
		line.pop()
	}
	let area = []

	for (let i of line) {
		for (let k of column)
			area.push(+(String(i) + String(k)))
	}
	shipCounter(area)
	return area
}

function shipCreator(target) {
	let x = +target.toString().split('').pop()   
	let y = +target.toString().split('').shift()
			
	if (+target.toString().split('').length == 1) {
		y = 0
	}
	


	if (freeZone(x,y)) {

		for (let i of shipArea(x,y)) {
			gameMap[i] = 2
		}

		for (let i of shipPosition(x,y)) {
			gameMap[i] = 1
		}
		
		console.log('корабль установлен')		
		console.log(gameMap)
		mapColor()
	} else {
		console.log(ships1)
		console.log(ships2)
		console.log('Нельзя расположить корабль здесь')
	}
	shipOpacity ()
}

function shipCounter (area) {
	playerCheck()
	if (ships[shipChoice][0] !== 0) {
		ships[shipChoice][0] = ships[shipChoice][0] - 1
		ships[shipChoice].push(area)
		for (i of area) {
			ships[0].push(i)
		}
		console.log('shipCounter:')
		console.log(ships)
		return true
	} else {
		return false
	}
	
}

function freeZone(x,y) {
	for (let i of shipArea(x,y)) {
		if (ships[0].includes(i)) {
			return false
			break
		} else if (ships[shipChoice][0] === 0) {
			return false
		}
	}
	return true
}



function shipDelete(target) {
	for (let k = 1; k <= 4; k++) {
		for (let i = 1; i < ships[k].length; i++ ) {
			if (ships[k][i].includes(target)) {
				
				let f = ships[k].splice(i,1)
				console.log(f)

				ships[k][0] = ships[k][0] + 1
				shipDelete2(f[0])


				
			}
		}
	}
}




function shipDelete2(array) {
	let target = array[0]
	let x = +target.toString().split('').pop()   
	let y = +target.toString().split('').shift()
	if (target.toString().split('').length == 1) {
		y = 0
	}
	
	for (let i of array) {
		if (ships[0].indexOf(i) != -1) {
			let k = ships[0].indexOf(i)
			ships[0].splice(k,1)
		}
	}

	if (array.length !== 1) {
		shipChoice = array.length
		if (array[1]-array[0] < 2) {
			for (let i of shipAreaX(x, y)) {
				
				gameMap[i] = 0
			}
			mapColorCheker()
		} else {
			for(let i of shipAreaY(x,y)) {
				gameMap[i] = 0
				
			}
			mapColorCheker()
		}
	} else {
		shipChoice = 1
		for (let i of shipAreaX(x,y)) {
			gameMap[i] = 0
			
			
		}
		mapColorCheker()
	}
	shipOpacity ()
}





function mapColorCheker() {
	playerCheck()


	let td = shipChoice;
	shipChoice = 1;

	for (let i of ships[0]) {
		let x = +i.toString().split('').pop()   
		let y = +i.toString().split('').shift()
		if (+i.toString().split('').length == 1) {
			y = 0
		}
		for (let k of shipAreaX(x,y)) {
			gameMap[k] = 2
		}
	}

	for (i of ships[0]) {
		gameMap[i] = 1
	}

	for (i of ships["attaked"]) {
		gameMap[i] = 3
	}
	for (i of ships["miss"]) {
		gameMap[i] = 6
	}
	for (ship of ships["dead"]) {
		for (i of ship) {
			let x = +i.toString().split('').pop()   
			let y = +i.toString().split('').shift()
			
			if (+i.toString().split('').length == 1) {
				y = 0
			}

			for (let k of shipAreaX(x,y)) {
				gameMap[k] = 5
			}	
		}
		for (i of ship) {
			gameMap[i] = 4
		}
	}

	shipChoice = td;
	mapColor()
	console.log(gameMap)
}







let ship = {
    "0": [19, 26, 41, 34, 81, 91, 94, 95, 12, 13, 74, 75, 76, 78, 88, 98, 54, 55, 56, 57],
    "1": [0,   [19],   [26],   [41],   [34]],
    "2": [0,   [81,91],   [94,95],   [12,13]],
    "3": [0,   [74,75,76],   [78,88,98]],
    "4": [0,   [54,55,56,57]],
    "attaked": [],
    "dead": [],
    "miss":[],
}


function shipAttack(target) {
	textPanel (target)
	

	if (player) {
		ships = ships2
		gameMap = gameMap2
	} else {
		ships = ships1
		gameMap = gameMap1
	}
	
	let shipOfShips = [ships[1][1],ships[1][2],ships[1][3],ships[1][4],
	ships[2][1],ships[2][2],ships[2][3],
	ships[3][1],ships[3][2],ships[4][1]];



	if (ships[0].includes(target)) {
		ships["attaked"].push(target)
		for (k of shipOfShips) {
			if (killed(k)) {
				if (ships["dead"].indexOf(k) == -1) {
					ships["dead"].push(k)
					for (i of k) {
						let x = +i.toString().split('').pop()   
						let y = +i.toString().split('').shift()
						if (i.toString().split('').length == 1) {
							y = 0
						}
						shipChoice = 1
						for (l of shipAreaX(x,y)) {
							ships["attaked"].push(l)
						}
					}

					console.log(k)
				}
			}
		}
	} else {
		ships["miss"].push(target)
	}
	mapColorCheker()
}



//shipAttack(91)
//shipAttack(81)
//shipAttack(1)



mapColorCheker()

function killed (ship) {
	if (player) {
		ships = ships2
	} else {
		ships = ships1
	}
    for (let i=0; i <ship.length; i++){
        if (ships["attaked"].indexOf(ship[i]) == -1) {
        	return false;
        }
    }
    return true;
}



function computerAttack () {
	if (ships2[0].length !== 20) {
		positionGenerate ()
	}
	if (player) {
		ships = ships2
	} else {
		ships = ships1
	}
	target = Math.floor(Math.random() * 100)
	while(true) {
		if (ships["miss"].includes(target) || ships["attaked"].includes(target)) {
			target = Math.floor(Math.random() * 100)
		} else {
			break
		}	
	}
	
	shipAttack(target)
	player = true
	
}
 
function positionGenerate () {
	playerCheck()


	while(true) {
		vertical = !vertical
		shipChoice = 4
		target = Math.floor(Math.random() * 100)
		if (ships[0].length !== 20) {
			if (ships[4][0] !==0) {
				shipChoice = 4
				shipCreator(target)
			} else if (ships[3][0] !==0) {
				shipChoice = 3
				shipCreator(target)
			} else if (ships[2][0] !==0) {
				shipChoice = 2
				shipCreator(target)
			} else if (ships[1][0] !==0) {
				shipChoice = 1
				shipCreator(target)
			} 
		} else {
			break
		}
	}
	mapColor()
}

function playerCheck() {
	endGame() 
	console.log(ships2)
	if (player) {
		ships = ships1
		gameMap = gameMap1
	} else {
		ships = ships2
		gameMap = gameMap2
	}
}

function endGame() {
	if (ships1["dead"].length >= 10 || ships2["dead"].length >= 10 ) {
		start = false
		textPanel (target)
		textPanel (target)
		textPanel (target)
	}
}





function autoBattle() {
	gameMap1 = Array(100).fill(0);
	gameMap2 = Array(100).fill(0);
	ships1 = {
		0: [],
		1: [4],
		2: [3],
		3: [2],
		4: [1],
		"attaked": [],
    	"dead": [],
    	"miss":[],
	}
	ships2 = {
		0: [],
		1: [4],
		2: [3],
		3: [2],
		4: [1],
		"attaked": [],
	    "dead": [],
	    "miss":[],
	}
	ships = {
		0: [],
		1: [4],
		2: [3],
		3: [2],
		4: [1],
		"attaked": [],
	    "dead": [],
	    "miss":[],
	}
	mapColor()
	player = !player
	mapColor()
	player = !player









	positionGenerate ()
	player = !player
	positionGenerate()
	start = !start
	

	function interval() {
		if (start === false) {
			clearInterval(battleInterval);
			player = false
			mapColorCheker()
			player = true
			mapColorCheker()
		} else {
			player = false
			computerAttack()
			player = true
			if (start === true) {
				computerAttack()
			}
			
		}

		
		
		
	}


	let battleInterval = setInterval(interval, 100);
	
}


	//while (x < 100) {
	//	x = x + 1
	//	player = false
	//	computerAttack()
	//	player = true
	//	computerAttack()
	//	if (!start) {
	//		x = x + 100
	//	}
	//}




//setInterval(autoBattle, 10000);
//positionGenerate ()









const textElements = document.querySelectorAll(".text_space > .text");
const textList = ['','','','','','','',''];


function textPanel (target) {
	

	let x = target.toString().split('').pop();  
	let y = +target.toString().split('').shift() + 1;
			
	if (target.toString().split('').length == 1) {
		x = 'A'
	} else {
		let symbol = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'L', 'J'];
		x = symbol[x]
	}
	

	if (player) {
		ships = ships2
	} else {
		ships = ships1
	}

	let newText;

	if (ships[0].includes(target)) {
		newText = x + y + '  Attaked !'
	} else {
		newText = x + y + '  Miss !'
	}


	if (ships1["dead"].length >= 10) {
		newText = 'Second player win!'
	} else if ( ships2["dead"].length >= 10 ) {
		newText = 'First player win!'
	}



	textList.pop()
	textList.unshift(newText)
	console.log(textList)
	let i = 0;
	for (let x of textElements) {
		x.textContent = textList[i];
		i++
	}

}




const fourDecks = document.querySelector('.four_decks');
const threeDecks = document.querySelector('.three_decks');
const twoDecks = document.querySelector('.two_decks');
const oneDecks = document.querySelector('.one_decks');



function shipOpacity () {
	if (ships1[1][0] === 0) {
		oneDecks.style.cssText = 'opacity: 0.3;';
	} else {
		oneDecks.style.cssText = 'opacity: 1;';
	}

	if (ships1[2][0] === 0) {
		twoDecks.style.cssText = 'opacity: 0.3;';
	} else {
		twoDecks.style.cssText = 'opacity: 1;';
	}


	if (ships1[3][0] === 0) {
		threeDecks.style.cssText = 'opacity: 0.3;';
	} else {
		threeDecks.style.cssText = 'opacity: 1;';
	}

	if (ships1[4][0] === 0) {
		fourDecks.style.cssText = 'opacity: 0.3;';
	} else {
		fourDecks.style.cssText = 'opacity: 1;';
	}

}

