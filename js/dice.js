class Player{

  constructor(currentScoreName,globalScoreName,current,global){
    this.currentScoreName=currentScoreName;
    this.globalScoreName=globalScoreName;
    this.current=current;
    this.global=global;
  }
  
}
//Evénement du click sur le bouton 'roll'
var tour=1;
var playerOne=new Player("score1","global1",0,0);
var playerTwo=new Player("score2","global2",0,0);
var roll=document.getElementById("roll");

roll.addEventListener('click',()=>{
  var dice=document.getElementById("nbDice");
  var tabChiffre=["img/un.png","img/deux.png","img/trois.png","img/quatre.png","img/cinq.png","img/six.png"];
  var player=playerOne;
  if (tour!=1){player=playerTwo}

  //animation du dé
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
        if(chiffre==1){
          if(tour==1){
            tour=2;
          }else{
            tour=1;
          }
        }else{
          
        //changement du current score du joueur en cours
        var current=document.getElementById(player.currentScoreName);
        var score=parseInt(current.innerHTML);
        score=score+chiffre;
        current.innerHTML=score;
        console.log(score);
        }
      }
    },100);

  
  
    
  
});


function entierAleatoire(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

