// Esta variable booleana la creamos para validar el ícono del check en el caballo presionado
var check = false;
// Esta variable la vamos a usar para identificar cual de qué color es el caballo presionado
let horse = "white";
// Aquí creamos la función que nos servira para que se agregue el ícono del check cuando presionemos sobre un caballo y se desapareza en el anterior
function checkHorse(checkr){

    // Aquí le decimos que lo quite al presionar
    $('.checkHorses').remove();
    
    // Aquí validamos para que se agregue el ícono sólo en el caballo presionado
    if(check === false || check === true){
        $(checkr).append(
            `<div class="checkHorses w-100 d-flex justify-content-start align-items-start position-absolute" marked="${$(checkr).attr('horse')}">
                <div class="mainButton text-success pr-1 pl-1" style="margin-top: -30px;"><i class="fa fa-check"></i></div>
            </div>`
        );
        check = true;
    }else{
        // sino me lo remueve
        $('.checkHorses').remove();
        check = false;
    }

    // Aquí le indicamos a la variable horse el color del caballo presionado
    horse = $('.checkHorses').attr('marked');

    // Ejemplo de las condiciones que se pueden hacer con la variable horse
    // if (horse === 'red') {
    //     alert('red');
    // }

    return horse;
}


recibido();
pinta();

function pinta(){

    const bac1 = document.getElementById('bac1');
    bac1.value =  localStorage.getItem('bc1');

     const bac2 = document.getElementById('bac2');
    bac2.value =  localStorage.getItem('bc2') ;

    const bac3 = document.getElementById('bac3');
    bac3.value =  localStorage.getItem('bc3') ;

    const bac4 = document.getElementById('bac4');
    bac4.value =  localStorage.getItem('bc4') ;

    const bac5 = document.getElementById('bac5');
    bac5.value =  localStorage.getItem('bc5') ;
}

function recibido() {
 
     const icon1=document.querySelectorAll('.colorCW2');

      for(i=0;i<icon1.length;i++){
       icon1[i].style.background=localStorage.getItem('bc1');
        
     }
   
//------------------------------------------------------------------------------

     const icon2=document.querySelectorAll('.colorCW');
     
      for(i=0;i<icon2.length;i++){
       icon2[i].style.color=localStorage.getItem('bc2');
 }

   
      const icon3=document.querySelectorAll('.ancort');
     
      for(i=0;i<icon3.length;i++){
       icon3[i].style.background=localStorage.getItem('bc3');
 }
     
     const icon4=document.querySelectorAll('.cuadro1'); 

      for(i=0;i<icon4.length;i++){
       icon4[i].style.background=localStorage.getItem('bc4');

 }


   const icon5=document.querySelectorAll('.cuadro2'); 

      for(i=0;i<icon5.length;i++){
       icon5[i].style.background=localStorage.getItem('bc5');
 }

    //--------------------------------------------------------------------------

};


const icon1=document.querySelectorAll('.colorCW2');
const Bac1=document.getElementById('bac1'); 
 
bac1.onchange = () => {
    for(i=0;i<icon1.length;i++){
icon1[i].style.background=Bac1.value;
 }
  localStorage.setItem('bc1',Bac1.value);
};

const icon2=document.querySelectorAll('.colorCW');

const Bac2=document.getElementById('bac2'); 
bac2.onchange = () => {
 for(i=0;i<icon2.length;i++){
icon2[i].style.color=Bac2.value;
 }
    localStorage.setItem('bc2',Bac2.value);
}   


const icon3=document.querySelectorAll('.ancort');

const Bac3=document.getElementById('bac3'); 
bac3.onchange = () => {
 for(i=0;i<icon3.length;i++){
icon3[i].style.background=Bac3.value;
 }
    localStorage.setItem('bc3',Bac3.value);
}  



const icon4=document.querySelectorAll('.cuadro1'); 

const Bac4=document.getElementById('bac4'); 

bac4.onchange = () => {
 for(i=0;i<icon4.length;i++){
icon4[i].style.background=Bac4.value;
 }
    localStorage.setItem('bc4',Bac4.value);
}

const icon5=document.querySelectorAll('.cuadro2'); 

const Bac5=document.getElementById('bac5'); 

bac5.onchange = () => {
 for(i=0;i<icon5.length;i++){
icon5[i].style.background=Bac5.value;
 }
    localStorage.setItem('bc5',Bac5.value);
}  

//----------------------------------------------------------------

// Aquí le estamos diciendo que el número del nivel de sonido se cambie automáticamente por el valor del input de rango en el sonido
$(document).on('input', '#sound', function() {
    $('#soundValue').html($(this).val());   
});



// Aquí capturamos el id del select de los lenguajes y de la imagen del idioma
const language = document.querySelector('#language');
const imgLanguage = document.querySelector('#imgLanguage');

// Aquí le asignamos un evento de cambio al Selection, y validamos si el idioma es en español, entonces coloque la imagen de españa, sino entonces la del reino unido
language.addEventListener('change', () => {
    if (language.value === 'spanish') {
        imgLanguage.src = './../../assets/flags/spain.png';
    } else {
        imgLanguage.src = './../../assets/flags/united-kingdom.png';
    }
});


// // Aquí capturamos el valor de todos los inputs y del color de los caballos
// back1.value;back2.value;tab1.value;tab2.value;sound.value;language.value;horse;
// // Aquí guardamos los datos de todos los inputs y del color de los caballos para enviarlos al index.js
// let conf = {back1,back2,tab1,tab2,sound,language,horse}
// ipcRenderer.send('config', conf);