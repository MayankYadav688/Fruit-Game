// Sword 
var sword,swordImage
// Enemy
var Monster,MonsterImage
// Fruit
var fruit1,fruit1Image,fruit2Image,fruit3Image,fruit4Image
// Gameover
var gameover,gameoverImage
// Sound
var knifeSound,gameoverSound
// GameState
var PLAY=1
var END=0
var gameState=1;
// Score
var Score


function preload(){
// Loading Image
swordImage = loadImage("sword.png")
  
MonsterImage =loadImage("alien1.png")
  
fruit1Image = loadImage("fruit1.png")
  
fruit2Image = loadImage("fruit2.png")
  
fruit3Image = loadImage("fruit3.png")
  
fruit4Image = loadImage("fruit4.png")
  
gameoverImage = loadImage("gameover.png")
  
knifeSound = loadSound("knifeSwooshSound.mp3")
  
gameoverSound = loadSound("gameover.mp3")
}


function setup() { 
  
//Canvas
createCanvas(600, 600);
 
// Adding Image
sword=createSprite(40,200,20,20)
sword.addImage(swordImage)
sword.scale = 0.7
  
// Groups
fruitGroup = createGroup();
enemyGroup = createGroup();
 }
score = 0;
gameState =PLAY;

function draw(){

background("pink")    
 text("Score: "+ score, 500,50);

  if (gameState ===PLAY){
    //call fruits and enemy Function
    fruits();
    Enemy();
    
    // Making Sword Move
sword.y=World.mouseY
sword.x=World.mouseX
    
    // Destroying food
if (fruitGroup.isTouching(sword)){
  destroy();
  knifeSound.play();
  score = score+2
  }
  
    if (enemyGroup.isTouching(sword)){
       gameState =END;
      gameoverSound.play();
    }
    
    
    
    
  }
  else if (gameState ===END){
      destroy2();
      
     fruitGroup.destroyEach();
     enemyGroup.destroyEach(); 
    
    
  }
   
drawSprites();

 
}


function fruits(){
 if (World.frameCount%80===0){
  fruit = createSprite(600,200,20,20)
  r=Math.round(random(1,4));
 if (r==1){
  fruit.addImage(fruit1Image);
  fruit.scale = 0.2
}else if (r==2){
  fruit.addImage(fruit2Image);
  fruit.scale = 0.2
}else if (r==3){
   fruit.addImage(fruit3Image); 
  fruit.scale = 0.2
}else {
  fruit.addImage(fruit4Image);
  fruit.scale = 0.2
}
 fruit.y=Math.round(random(50,340));
   
 fruit.velocityX=-7;
 fruit.setLifetime=100
   
 fruitGroup.add(fruit)
 }
}

function positions (){ 
position = Math.round(random(1,2))
fruit = createSprite(400,200,20,20);
if (position == 1)
{
  fruit.x = 400
  fruit.velocityX = -(7+(score/4));
}
  else
  {
    if (position==2){
      fruit.x=0
      fruit.velocityX = -(7+(score/4));
    }
    
  }
}

function Enemy(){
 if(World.frameCount%200===0) {
  Monster = createSprite(600,200,20,20);
  Monster.addAnimation("moving",MonsterImage)
  Monster.y=Math.round(random(100,300))
  Monster.velocityX = -(8+(score/10))
  Monster.setLifetime = 50;
  enemyGroup.add(Monster);
  }
}


function destroy (){
 fruitGroup.destroyEach();
}


function destroy2 (){
 enemyGroup.destroyEach();
  gameover = createSprite(300,200,20,20) 
 gameover.addImage(gameoverImage)
 gameover.scale = 2
 score = 0
}
