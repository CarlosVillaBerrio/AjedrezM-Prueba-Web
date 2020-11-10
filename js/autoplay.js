var CellSelected_x;
var CellSelected_y;
var Moves;
var Options;
let filas = 8;
let columnas = 8;
var x1 = 0, y1 = 0;

var puedeDibujar = true;
var botonActivo = 1;

var secs;
var mins;
var cronometer;

var board = new Array(8);

// Empieza el juego 
const lienzo = document.querySelector('#lienzo');
const ctx = lienzo.getContext('2d');
//inicializamos el color de la linea
ctx.strokeStyle = "rgb(200,0,0)";
//tamaño que se le dara en pixeles al lienzo
const tamano = 266;
let isDrawing = false;
// Definimos el  ancho y largo del tablero
lienzo.width = tamano;
lienzo.height = tamano;


	 
function ResetTime(){
    clearInterval(cronometer);
}

function StarTime(){
    secs =0;
    mins =0;
    s = document.getElementById("seconds");
    m = document.getElementById("minutes");

    cronometer = setInterval(
        function(){
            if(secs==60){
                secs=0;
                mins++;
                if (mins<10) m.innerHTML ="0"+mins;
                else m.innerHTML = mins;

                if(mins==60) mins=0;
            }
            if (secs<10) s.innerHTML ="0"+secs;
            else s.innerHTML = secs;

            secs++;
        }
        ,1000);
}


function Check_SuccessfulEnd(){

	SuccessfulEnd = true;
	if (Moves > 0) SuccessfulEnd = false;
	/*
	for (i=0; i<8 && SuccessfulEnd; i++){
		for (j=0; j<8 && SuccessfulEnd; j++){
			//if (board[x][y] == 0) SuccessfulEnd=false; //habria que depurar para que nada mas empezar no salga esto
			cell = document.getElementById("c"+x+y);
			if (cell.style.background != "none repeat scroll 0% 0% green" || 
				cell.style.background != "none repeat scroll 0% 0% orange" ) 
				SuccessfulEnd=false;

		}
	}
	*/
	if (SuccessfulEnd){
		ShowGameOver("You win!!", "Return to Game", false);
		autoplay();
	} 
}

function Check_GameOver(x, y){

	Options = 0;

	Check_Move(x, y, 1, 2);		//check move right - top long
	Check_Move(x, y, 2, 1);		//check move right long - top
	Check_Move(x, y, 1, -2);	//check move right - bottom long
	Check_Move(x, y, 2, -1);	//check move right long - bottom
	Check_Move(x, y, -1, 2);	//check move left - top long
	Check_Move(x, y, -2, 1);	//check move left long - top
	Check_Move(x, y, -1, -2);	//check move left - bottom long
	Check_Move(x, y, -2, -1);	//check move left long - bottom

	cont_moves = document.getElementById("options").innerHTML = Options;

	if (!Options){
		ShowGameOver("Game Over", "Try Again!", true);
		autoplay();
	}

}
 // Este es para la sombra 
function PaintCell(x, y){
	cell = document.getElementById("c"+CellSelected_x+CellSelected_y);
	cell.style.background = "none repeat scroll 0% 0% orange";
	console.log(1);
	
}

function DespejarCeldaAnterior(x, y){
	cell = document.getElementById("c"+x+y); // Las variables 'x' y 'y' deben ser la ultima posicion
	
	cell.style.background = ""; // VACIO para borrar elemento COLOR
	
	cell = document.getElementById("c"+x+y).innerHTML = ""; // VACIO para borrar elemento IMAGEN
}

 // Esta funcion permite mostrar el caballo en el tablero y marcarlo en la casilla seleccionada con ayuda de CheckCell()
function SelectCell(x, y){

	//Moves--; // Reduce el numero de movimientos en el reto del caballo
	cont_moves = document.getElementById("moves").innerHTML = Moves; // NO BORRAR: Puede servir para indicar el numero de lineas faltantes
	
	//PaintCell(x, y);

	cell = document.getElementById("c"+x+y);
	console.log(2);
	cell.style.background = "none repeat scroll 0% 0% green";
	console.log(3);
	cell = document.getElementById("c"+x+y).innerHTML = 
		"<img id='" + x + y + "' src='horse.gif'></img>";

		MostrarBotonSobreCaballo(x,y);
	
	//board[x][y]=1;
	CellSelected_x=x;
	CellSelected_y=y;

	Check_SuccessfulEnd();
	Check_GameOver(x, y);
	
	if(puedeDibujar && !dibujoEmpezado){
		caballoInicial(x,y);
		dibujoEmpezado = true;
	}

	if(!puedeDibujar && dibujoEmpezado){
		dibujoEmpezado = false;
	}

	pintar(x,y);
	

}

var dibujoEmpezado = false;

// MACHETAZO EN EL QUE EL BOTON SIGUE AL CABALLO PARA NO SALIR DEL TABLERO PARA PARAR EL DIBUJADO
function MostrarBotonSobreCaballo(x,y){

	let boton = document.getElementById("botonDibujar"); // Obtiene la referencia del boton en memoria
	let padreT = document.getElementById("c"+x+y);
	let elTablero = document.getElementById("fondo");
	let posPadreT = padreT.getBoundingClientRect();
	
	let posX = posPadreT.left - elTablero.offsetLeft; // Calculos para que funcione con la resolucion de la pantalla
	let posY = posPadreT.top - elTablero.offsetTop - 30; // y el boton se encuentre en el mismo punto con diferentes resoluciones

	boton.style.position = 'absolute';

	boton.style.transform = "translate("+ posX + "px ," + posY +"px)"; // 

	boton.style.borderRadius = 80 + "px";
}

function CheckCell(x, y){

	dif_x = x - CellSelected_x;
	dif_y = y - CellSelected_y;
	CheckTrue = false;

	if (dif_x == 1 && dif_y == 2)   CheckTrue = true; // right - top long
	if (dif_x == 1 && dif_y == -2)  CheckTrue = true; // right - bottom long
	if (dif_x == 2 && dif_y == 1)   CheckTrue = true; // right long - top
	if (dif_x == 2 && dif_y == -1)  CheckTrue = true; // rightlong - bottom
	if (dif_x == -1 && dif_y == 2)  CheckTrue = true; // left - top long
	if (dif_x == -1 && dif_y == -2) CheckTrue = true; // left - bottom long
	if (dif_x == -2 && dif_y == 1)  CheckTrue = true; // left long - top
	if (dif_x == -2 && dif_y == -1) CheckTrue = true; // left long - bottom

	if (board[x][y]==1) CheckTrue=false;
	// debugger;

	if (CheckTrue) {
		DespejarCeldaAnterior(CellSelected_x, CellSelected_y); // En este punto CellSelected viene siendo la celda anterior
		
		SelectCell(x, y); // Aqui se actualiza CellSelected a la posicion Actual
	
	}
	// debugger;
}


function autoplay(){
	
	message = document.getElementById("message");
	message.style.display = "none";

	for (i=0; i<10; i++) board[i]= new Array(8);

	ClearBoard();
	ResetTime();
	StarTime();
	Moves=64;	

	x=Math.round(Math.random()*7);
	y=Math.round(Math.random()*7);
	
	CellSelected_x=x;
	CellSelected_y=y;

	SelectCell(x, y);

}


autoplay();

function hide_message(){
	message = document.getElementById("message");
	message.style.display = "none";
	autoplay();
}

function ClearBoard(){
	for (i=0; i<8; i++){
		for (j=0; j<8; j++){
			board[i][j]=0;

			cell = document.getElementById("c"+i+j);
			cell.style.background = "";  
			cell = document.getElementById("c"+i+j).innerHTML = "";
		}
	}

}

function botonDibujar(){
	// Esto es una variable global
	puedeDibujar = !puedeDibujar; // Alterna los valores del boton que permite dibujar. EL JUEGO EMPIEZA DIBUJANDO.

	let boton = document.getElementById("botonDibujar"); // Obtiene la referencia del boton en memoria
	// Condiciones que marcan el estado de si esta dibujando o no
	if(botonActivo == 1){
		boton.style.backgroundColor = "red"; // RETROALIMENTACION. Cambia a NO dibujar
		botonActivo = 0;
	} else{
		boton.style.backgroundColor = "green"; // RETROALIMENTACION. Cambia a SI dibujar
		botonActivo = 1;
	}

}

// --------------------------------------00000000000000000000000000000000000000000000000000000000---------------------------
// --------------------------------------00000000000000000000000----0----000000000000000000000000---------------------------
// --------------------------------------00000000000000000000000000000000000000000000000000000000---------------------------



function caballoInicial(x,y){
	 // formula para hayar el tamaño de las columnas y filas
	 let c = tamano / columnas;
	 console.log(c + "tamañao y columas ");
	 let f = tamano / filas;
	 console.log(f + "tamañao y  ");
	 // formula para hayar la media final de las columas y filas
	 let cf = c * x;
	 let ff = f * y;
	 // formula para hayar el punto medio de la columna y la fila.
	 let cm = cf - (c / 2);
	 
	 let fm = ff - (f / 2);

	 x1 = fm;
	 y1 = cm;
}

function pintar(x,y) {
    console.log("caballo se pinta en x,y ",x,y );
    // con fillStyle sera el color de relleno, strokeStyle es el color de la lines y el line Width es el grosor de la linea
    ctx.fillStyle = "red";
    ctx.strokeStyle = "#fefbd8";
    ctx.lineWidth = 2;

    // formula para hayar el tamaño de las columnas y filas
    let c = tamano / columnas;
    console.log(c + "tamañao y columas ");
    let f = tamano / filas;
    console.log(f + "tamañao y  ");
    // formula para hayar la media final de las columas y filas
    let cf = c * x;
    let ff = f * y;
    // formula para hayar el punto medio de la columna y la fila.
    let cm = cf - (c / 2);
    
    let fm = ff - (f / 2);
    
    let colEnd = cm;
	let rowEnd = fm;
	
    // con el canvas comenzamos a realizar el dibujo según las pociones arrojadas por la formula en cm y fm
    // para comenzar el dibujo de canvas se usa la siguiente linea
	
	// CONDICION: Este es el permiso del boton. Inicia el juego dibujando
	if(puedeDibujar){
		// CONDICION: Permite trazar la linea en el canvas
		if (!isDrawing) {
			console.log(isDrawing);
			ctx.beginPath();
			ctx.moveTo(x1, y1);			
			isDrawing = true;
		} else {
			ctx.lineTo(rowEnd, colEnd);
			ctx.moveTo(x1, y1);
			ctx.stroke();
			
			//ctx.beginPath();
		}
		ctx.clearRect(333,333); // NOOOO SIRVE LA UNICA COSA QUE BORRA Y RESULTA QUE SOLO BORRA RECTANGULOS NO LINEAS!!!!
		//ctx.moveTo(fm, cm);
	} else{
		//ctx.closePath();
		//ctx.beginPath();
		//ctx.stroke();
		ctx.moveTo(x1, y1); // Linea que permite que el punto inicial de trazado acompañe al caballo cuando no dibuja
		ctx.clearRect(200,120);
	}
}

// function ShowGameOver(string_notification, string_button, game_over){
// 	ResetTime();
// 		score_min = mins;
// 		score_sec = secs;
// 		string_score="";
// 		if (score_min<10) string_score="0";
// 		string_score=string_score + score_min + ":";
// 		if (score_sec<10) string_score=string_score +"0";
// 		string_score=string_score + score_sec;

// 		//string_tweet="<a id='tweet_game_over' href='https://twitter.com/share' class='twitter-share-button' data-via='JoseCodFacilito' data-size='large' data-count='none' data-text='No soy capaz de hacer este juego!! ' target='_blank'>Tweet</a>"

// 		//function ShowGameOver(){
// 			GameOver = document.getElementById("message");
// 			GameOver.style.display = "block";
// 			Message_GameOver=document.getElementById("notification");
// 			Message_GameOver=document.getElementById("notification").innerHTML=string_notification;
// 			Message_GameOver=document.getElementById("final_score");
// 			Message_GameOver=document.getElementById("final_score").innerHTML="Time " + string_score;
// 			Message_GameOver=document.getElementById("button");
// 			Message_GameOver=document.getElementById("button").innerHTML= string_button;
			
// 			if (game_over == true){
// 				Tweet_Game=document.getElementById("tweet_game_ok");
// 				Tweet_Game.style.display = "none";
// 			}
// 			else{
// 				Tweet_Game=document.getElementById("tweet_game_over");
// 				Tweet_Game.style.display = "none";
// 			}
// 		WhiteRestart();
// }

function Check_Move(x, y, mov_x, mov_y){
		option_x = x+mov_x;
		option_y = y+mov_y;

		if (option_x < 8 && option_y < 8 && 
			option_x >= 0 && option_y >= 0){

		if (board[option_x][option_y] == 0) Options++;

	}
}
