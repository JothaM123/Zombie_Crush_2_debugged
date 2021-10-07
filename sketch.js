const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground, block1, block2, bridge, bridgeCon, zomb, jointPoint, bg;
var stonesArray = [];
var z1,z2,z3,z4,br;


function preload(){
z1 = loadImage('assets/zombie1.png');
z2 = loadImage('assets/zombie2.png');
z3 = loadImage('assets/zombie3.png');
z4 = loadImage('assets/zombie4.png');

bg = loadImage('assets/background.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0,height-10, width * 2, 20);
  block1 = new Base(100, height-300, 200, height / 2 + 100);
  block2 = new Base(width - 100, height - 300, 200, height/2+100);
  //fill("yellow");
  bridge = new Bridge(20, { x: 50, y: height / 2-140 });
  jointPoint = new Base(width - 250, height / 2 - 100,  40 , 20);


  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2-200 , width/2+300 );
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stonesArray.push(stone);
  }
  zomb = createSprite(width/2, height-110);
  zomb.addAnimation("lr", z1, z2, z1);
  zomb.addAnimation("rl", z3, z4, z3);
  zomb.scale = 0.1;
  zomb.velocityX = 10;


  br = createButton("");
  br.position(width-200, height/2-50);
  br.class("breakbutton");
  br.mouseClicked(()=>{

    jointLink.dettach();
    console.log(123);
    setTimeout(()=>{
      bridge.break();
      World.remove(world, bridge.body);
    }, 1500);

  });


}

function draw() {
  background(bg);
  Engine.update(engine);



  bridge.show();
  

  for (var stone of stonesArray) {
    fill("white");
    stone.show();
  }




  if(zomb.position.x >=width-30){
    zomb.velocityX = -10;
    zomb.changeAnimation("rl");
  }

  if(zomb.position.x <= 300){
    zomb.velocityX = 10;
    zomb.changeAnimation("lr");
  }

  drawSprites()
}

