import Player from './Player.js'

//Initialisation des variables
let tour=1;
const playerOne=new Player("score1","global1",0,0);
const playerTwo=new Player("score2","global2",0,0);
const roll=document.getElementById("roll");
const hold=document.getElementById("hold");
const newGame=document.getElementById("new");
const end=document.getElementById('end');
const dice=document.getElementById("nbDice");
const tabChiffre=["img/un.png","img/deux.png","img/trois.png","img/quatre.png","img/cinq.png","img/six.png"];

//Evénement du click sur le bouton 'roll'
roll.addEventListener('click',()=>{

  let player=playerOne;
  if (tour!=1){
    player=playerTwo
  }

  //animation du dé
  const audio = new Audio('sounds/son.mp3');
      audio.play();
  let i=0;
  let y=0;

  //changement du chiffre du dé pendant 24 intervalles de 100ms
  let timer=setInterval(function(){
    dice.setAttribute('src',tabChiffre[i]);
    console.log(tabChiffre[i]);
    i++;
    y++;
    if(i==6){
      i=0
    };
    if(y==24){
      clearInterval(timer);

      //résultat du lancer de dé
      let chiffre=entierAleatoire(1,6);
      dice.setAttribute("src",tabChiffre[chiffre-1]);
      console.log('le chiffre est '+ tabChiffre[chiffre-1]);
      let current=document.getElementById(player.currentScoreName);

      // si le résultat est 1
      if(chiffre==1){
        current.innerHTML=0;
        const audiolost = new Audio('sounds/lost.wav');
        audiolost.play();

        //si c'est le tour du joueur 1
        if(tour==1){
          changeTour(tour);
          tour=2;
        //si c'est le tour du joueur 2
        }else{
          changeTour(tour);
          tour=1;
        }
      }else{
        //changement du current score du joueur en cours
        let score=parseInt(current.innerHTML);
        score=score+chiffre;
        current.innerHTML=score;
        console.log(score);
        player.current=score;
      }
    }
  },100);   
});

// Evènement click sur le bouton 'hold'
hold.addEventListener('click',()=>{

  if(tour==1){
    holdPlayer(playerOne)
  }else{
    holdPlayer(playerTwo)
  }
});

//Evènement du click sur la croix de partie terminée
const close=document.getElementById('close');
close.addEventListener('click',()=>{
  end.style.display="none";
  reset(playerOne);
  reset(playerTwo);
  tour=2;
  changeTour(tour);
  tour=1;
});

// Evènement du click sur le bouton 'new game'
newGame.addEventListener('click',()=>{
  reset(playerOne);
  reset(playerTwo);
  tour=2;
  changeTour(tour);
  tour=1;
  end.style.display="none";
});

// Fonction qui est déclenché lors du click sur le bouton "hold" en fonction du joueur en paramêtre
function holdPlayer(player){
  player.global+=player.current;
  if(player.global>=100){
    end.style.display="initial";
    if(tour==1){
      end.appendChild(document.createTextNode("C'est terminée ! Le joueur 1 a gagné !"));
    }else{
      end.appendChild(document.createTextNode("C'est terminée ! Le joueur 2 a gagné !"));
    }
    changeGlobal(player.globalScoreName,player.currentScoreName,player.global);
  }else{
    changeGlobal(player.globalScoreName,player.currentScoreName,player.global);
    changeTour(tour);
    if(tour==1)
      {tour=2;}
    else{tour=1;}
    player.current=0;
  }
}

// Fonction qui génère un entier aléatoirement entre deux entiers
function entierAleatoire(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// fonction qui change le score global du joueur en cours et remet le score courant à 0
function changeGlobal(id,idCurrent,score){
  const global=document.getElementById(id);
  const current=document.getElementById(idCurrent);
  global.innerHTML=score;
  current.innerHTML=0;
}

// Fonction qui remet les scores à 0.
function reset(player){
  const globalreset=document.getElementById(player.currentScoreName);
  const currentreset=document.getElementById(player.globalScoreName);
  globalreset.innerHTML=0;
  currentreset.innerHTML=0;
  player.current=0;
  player.global=0;
}

// Fonction qui change de tour et passe la pastille rouge à l'autre joueur 
function changeTour(tour){
  const circle1=document.getElementById("circle1");
  const circle2=document.getElementById("circle2");
  if(tour==1){
    circle1.style.display="none";
    circle2.style.display="initial"
  }else{
    circle1.style.display="initial";
    circle2.style.display="none";
  }
}
