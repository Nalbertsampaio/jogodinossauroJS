const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let pulando = false;
let position = 0;
let fim = false;

function okeyUp(event) {
     if (event.keyCode === 32) {
        if(!pulando) {
        pulo();
       }
    }
}
function pulo() {
     pulando = true;

    let upInterval = setInterval(() => { 
        if(position >= 150) {
            clearInterval(upInterval);     //é um intervalo, a cada 20 mmilisegundos ele anda 20 de posição
          
            let downInterval = setInterval(() => {
               if(position <= 0) {
                   clearInterval(downInterval);
                   pulando = false;
               }else{
                position -= 20;
                dino.style.bottom = position + 'px';
           }
         }, 20);
   } else {       
        position += 20;
        dino.style.bottom = position + 'px';
   } 
  }, 20);
}
function criarCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;  

    if (fim) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus); 
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() => {
          if(cactusPosition  < -60) {
            clearInterval(leftTimer);
            background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftTimer);
            fim = true;
            document.body.innerHTML = '<h1 class ="game-over">Fim de jogo</h1>';
            }else{
            cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(criarCactus, randomTime);
}
criarCactus();
document.addEventListener('keyup', okeyUp);
