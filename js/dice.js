class Player{

  constructor(currentScoreName,globalScoreName,current,global){
    this.currentScoreName=currentScoreName;
    this.globalScoreName=globalScoreName;
    this.current=current;
    this.global=global;
  }
  
}
//Initialisation des variables
var tour=1;
var playerOne=new Player("score1","global1",0,0);
var playerTwo=new Player("score2","global2",0,0);
var roll=document.getElementById("roll");
var hold=document.getElementById("hold");
var newGame=document.getElementById("new");

//Evénement du click sur le bouton 'roll'
roll.addEventListener('click',()=>{
  var dice=document.getElementById("nbDice");
  var tabChiffre=["img/un.png","img/deux.png","img/trois.png","img/quatre.png","img/cinq.png","img/six.png"];
  var player=playerOne;
  if (tour!=1){player=playerTwo}

//animation du dé
  var audio = new Audio('sounds/son.mp3');
      audio.play();
  var i=0;
  var y=0;
    //changement du chiffre du dé pendant 24 intervalles de 100ms
    timer=setInterval(function(){
      dice.setAttribute('src',tabChiffre[i]);
      console.log(tabChiffre[i]);
      i++;
      y++;
      if(i==6){i=0};
      if(y==24){clearInterval(timer);
        //résultat du lancer de dé
        var chiffre=entierAleatoire(1,6);
        dice.setAttribute("src",tabChiffre[chiffre-1]);
        console.log('le chiffre est '+ tabChiffre[chiffre-1]);
        var current=document.getElementById(player.currentScoreName);

        // si le résultat est 1
        if(chiffre==1){
          current.innerHTML=0;
          var audiolost = new Audio('sounds/lost.wav');
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
        var score=parseInt(current.innerHTML);
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
    playerOne.global+=playerOne.current;
      if(playerOne.global>=100){
        var end=document.getElementById('end');
        end.style.display="initial";
        changeGlobal(playerOne.globalScoreName,playerOne.currentScoreName,playerOne.global);
      }else{
        changeGlobal(playerOne.globalScoreName,playerOne.currentScoreName,playerOne.global);
        changeTour(1);
        tour=2;
        playerOne.current=0;
      }
  }else{
    playerTwo.global+=playerTwo.current;
      if(playerTwo.global>=100){
        var end=document.getElementById('end');
        end.style.display="initial";
        changeGlobal(playerTwo.globalScoreName,playerTwo.currentScoreName,playerTwo.global);
      }else{
        changeGlobal(playerTwo.globalScoreName,playerTwo.currentScoreName,playerTwo.global);
        changeTour(2);
        tour=1;
        playerTwo.current=0;
      }
  }
});

// Evènement du click sur le bouton 'new game'
newGame.addEventListener('click',()=>{

  reset(playerOne);
  reset(playerTwo);
  tour=2;
  changeTour(tour);
  tour=1;
  var end=document.getElementById('end');
      end.style.display="none";
});

// Fonction qui génère un entier aléatoirement entre deux entiers
function entierAleatoire(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// fonction qui change le score global du joueur en cours et remet le score courant à 0
function changeGlobal(id,idCurrent,score){
  var global=document.getElementById(id);
  var current=document.getElementById(idCurrent);
  global.innerHTML=score;
  current.innerHTML=0;
}

// Fonction qui remet les scores à 0.
function reset(player){
  var global=document.getElementById(player.currentScoreName);
  var current=document.getElementById(player.globalScoreName);
  global.innerHTML=0;
  current.innerHTML=0;
  player.current=0;
  player.global=0;
}

// Fonction qui change de tour et passe la pastille rouge à l'autre joueur 
function changeTour(tour){
  if(tour==1){
    var circle1=document.getElementById("circle1");
    var circle2=document.getElementById("circle2");
    circle1.style.display="none";
    circle2.style.display="initial"
  
  }else{
    var circle1=document.getElementById("circle1");
    var circle2=document.getElementById("circle2");
    circle1.style.display="initial";
    circle2.style.display="none";
  }
}
