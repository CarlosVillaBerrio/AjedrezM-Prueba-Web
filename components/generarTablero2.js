// Tablero de abajo 
 // Aca encontramos la parte las coordenadas 

const { getCatalog } = require("i18n");

// Todo este script es para generar el tablero 2 en el juego de cualquier categoría
//Definimos las variables globales para ilustrar en canvas
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


// realizacion del tablero adaptable al tamaño deceado
var tablero = document.querySelector("#tablero2"),
    tbl = document.createElement("table");
tbl.style.borderStyle = "solid";
$(tbl).attr('id', 'tabla');

for (var x = 0; x <= filas; x++) {
    var tr = tbl.insertRow();
    for (var y = 0; y <= columnas; y++) {
        let td = tr.insertCell();
        td.style.margin = "0px !important";
        td.style.padding = "0px !important";
        td.setAttribute('trCell', x);
        // $(td).html(`x:${x} y:${y}`);
        if (y === 0 && x >= 0) {
            td.appendChild(document.createTextNode(x));
            $(td).attr('id', 'a' + x + y).addClass('pb-0 pt-0 pr-2 pl-2 text-center colorCW cuadro1');
            $(td).attr('style', 'background-color: #ffffff !important; border-width: 2px 0 2px 0 !important;');
            $(td).attr('onClick', `reflejar(${x},${y})`);
        } else if (x === 0 && y >= 0) {
            td.appendChild(document.createTextNode(y));
            td.style.border = "1px solid black";
            $(td).attr('id', 'a' + x + y).addClass('p-0 text-center colorCW cuadro1');
            $(td).attr('style', 'background-color: #ffffff !important; border-width: 0 2px 0 2px !important;');
            $(td).attr('onClick', `reflejar(${x},${y})`);
        } else {
            td.appendChild(document.createTextNode(""));
            td.style.border = "1px solid black";
            $(td).attr('id', 'a' + x + y);
            $(td).attr('onClick', `reflejar(${x},${y})`);
        }

        // condicion posision 0,0
        if (x === 0 && y === 0) {
            $(td).attr('style', 'border-width:0 !important; background:white;')
            $(td).html('');
        }

        // condicion para pintar las casillas blancas o negras
        if (y>=1 && x>=1) {

            $(td).hover(() => {
                $(td).css({'box-shadow':'inset 0 0 0 2px var(--info)','transition': 'all .2s ease'}); 
            }, () => {
                $(td).css('box-shadow','inherit');
            });
            
            if (y % 2 === 0 && x % 2 || y % 2 && x % 2 === 0) {
                $(td).addClass('cuadro1 ');
            
                // td.style.backgroundColor = "red";
                td.style.color = "#fff";
                $(tbl).addClass(' cuadro2 ');
            } else {
                td.style.backgroundColor = "cuadro1";
            }
        }
        
        // Esto es para pintar las coordenadas en x-y según la casilla donde se posicione el cursor
        $(td).hover(() => {
            if($(td).attr('id').substr(1,5).length === 3 && parseInt($(td).attr('id').substr(1,2)) >= 10 && $(td).attr('id').substr(1,4).length === 3 && parseInt($(td).attr('id').substr(1,2)) <= 20 && td.getAttribute('trCell') != 1){
                $('#coordenadas').html(`(${$(td).attr('id').substr(3,1)},${$(td).attr('id').substr(1,2)})`);  
            }else if($(td).attr('id').substr(1,4).length === 3){
                $('#coordenadas').html(`(${$(td).attr('id').substr(2,2)},${$(td).attr('id').substr(1,1)})`);  
            }else if($(td).attr('id').substr(1,4).length === 4){
                $('#coordenadas').html(`(${$(td).attr('id').substr(3,2)},${$(td).attr('id').substr(1,2)})`);  
            }else{
                $('#coordenadas').html(`(${$(td).attr('id').substr(2,1)},${$(td).attr('id').substr(1,1)})`);  
            }
        }, () => {
            $('#coordenadas').html(`(0,0)`);  
        }); 
        
    }
    
    tablero.appendChild(tbl);
}
// fin tablero adaptable

function pintar(x, y) {

    debugger;
    console.log("caballo se pinta en x,y ", x, y);
    // con fillStyle sera el color de relleno, strokeStyle es el color de la lines y el line Width es el grosor de la linea
    ctx.fillStyle = "red";
    ctx.strokeStyle = "#fefbd8";
    ctx.lineWidth = 4;

    // formula para hayar el tamaño de las comunas y filas
    let c = tamano / columnas;
    console.log(c + "tamañao y columas ");
    let f = tamano / filas;
    console.log(f + "tamañao y  ");
    // formula para hayar la media final de las columas y filas
    let cf = c * x; 
    console.log(cf);
    let ff = f * y;
    console.log(ff);
    // formula para hayar el punto medio de la columna y la fila.
    let cm = cf - (c / 2);
    console.log(cm + "CM");
    let fm = ff - (f / 2);
    console.log(fm + "FM");
   

    let colEnd = cm;
    console.log(colEnd + "CEND");
    let rowEnd = fm;
    console.log(rowEnd + "REND");
    // con el canvas comenzamos a realizar el dibujo según las pociones arrojadas por la formula en cm y fm
    // para comenzar el dibujo de cambas se usa la siguiente linea
    if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(fm, cm);
        isDrawing = true;
        
    } else {
        ctx.lineTo(rowEnd, colEnd);
        // ctx.closePath();
        // ctx.fill();
        ctx.stroke();
    }
}

function reflejar(x, y) {
    
    if (board[x][y] != 0) {
        $(`#a${x}${y}`).attr('style', "background-image: url('./../../../assets/pieces/whiteHorse2.png') !important;");
        $('#shadowTab1').addClass('d-none');
        $('#shadowTab2').removeClass('d-none');

        $('body').css('cursor', 'auto');
        
        pintar(x, y);
    } else {
        fallos++;
        $(`.fallos`).html(fallos);
    }
}

