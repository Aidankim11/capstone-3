const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
function preload(){
  bg=loadImage("images/background.png")
  fruit=loadImage("images/melon.png")
  bunnyImg=loadImage("images/Rabbit-01.png")
  blinks=loadAnimation("images/blink_1.png","images/blink_2.png","images/blink_3.png")
  eats=loadAnimation("images/eat_0.png","images/eat_1.png","images/eat_2.png","images/eat_3.png","images/eat_4.png")
  sad=loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png")
  bgs=loadSound("images/sound1.mp3")
  sads=loadSound("images/sad.wav")
  eating=loadSound("images/eating_sound.mp3")
  cut=loadSound("images/rope_cut.mp3")
  air=loadSound("images/air.wav")
  eats.looping=false
  sad.looping=false
  bubbleimg=loadImage("images/bubble.png")
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);
  bgs.play()
  bgs.setVolume(0.2)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,580,600,20);
  rope=new Rope(4,{x:250,y:120})
  rope2=new Rope(6,{x:350,y:120})
  food= Bodies.circle(250, 300, 20)
  Composite.add(rope.body,food)
  connect=new Link(rope,food)
  connect2=new Link(rope2,food)
  rope3=new Rope(7,{x:150,y:120})
  connect3=new Link(rope3,food)
  blinks.frameDelay=20
  sad.frameDelay=20
  eats.frameDelay=20
  bunny=createSprite(450,50,30,10)
  bunny.addAnimation("blinking",blinks)
  bunny.addAnimation("eating",eats)
  bunny.addAnimation("sadness",sad)
  bunny.scale=0.2
  button=createImg("images/cut_btn.png")
  button.position(230,120)
  button.size(50,50)
  button.mouseClicked(function(){
    rope.break()
    connect.break()
    cut.play()
  })
  button2=createImg("images/cut_btn.png")
  button2.position(330,120)
  button2.size(50,50)
  button2.mouseClicked(function(){
    rope2.break()
    connect2.break()
    cut.play()
  })
  button3=createImg("images/cut_btn.png")
  button3.position(130,120)
  button3.size(50,50)
  button3.mouseClicked(function(){
    rope3.break()
    connect3.break()
    cut.play()
  })
  fan=createImg("images/balloon.png")
  fan.position(20,250)
  fan.size(150,100)
  fan.mouseClicked(function(){
    Matter.Body.applyForce(food,food.position,{x:0.01,y:0})
    air.play()
    air.setVolume(0.2)
  })
  mute=createImg("images/mute.png")
  mute.position(450,120)
  mute.size(50,50)
  mute.mouseClicked(function(){
    if(bgs.isPlaying()){
      bgs.stop()
    }else{
      bgs.play()
    }
  })
  bubble=createSprite(420,260,20,20)
  bubble.addImage(bubbleimg)
  bubble.scale=0.1
}

function draw() 
{
  background(bg);
  rope.show()
  rope2.show()
  rope3.show()
  Engine.update(engine);
  push()
  //null is nothing
  //!= is "not equal"
  if(food!=null){
  imageMode(CENTER);
  image(fruit,food.position.x, food.position.y,70,70)
  }
  pop()

  if(collides(food,bunny)){
    bunny.changeAnimation("eating",eats)
    World.remove(world,food)
    food = null
    eating.play()
    bubble.destroy()
  }
  if(food!=null&& food.position.y>540){
    bunny.changeAnimation("sadness",sad)
    food = null
    sads.play()
  }
  if(collides(food,bubble)){
    if(food){
    Matter.Body.applyForce(food,food.position,{x:0,y:-0.01})
    bubble.position.x=food.position.x
    bubble.position.y=food.position.y
    }
  }
 drawSprites()
   
}

//dist(x1,y1,x2,y2) it will give distance btw these x y pairs
function collides(body,sprite){
  if(body!==null){
  var distance=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(distance<80){
    return true
  }else{
    return false
  }
}
}
