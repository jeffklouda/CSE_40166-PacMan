var scene, camera, controls, loader, textureLoader, board;
var board, pacman0, pacman1, pacman2, inky, blinky, pinky, clyde, inkyB, blinkyB, pinkyB, clydeB;
var myGame, direction;
var pellets = [];
var dots = [];
var renderer;
var counter = 0;
var hLight;
var canvas, ctx, scoreGeo, scoreMat, scoreTex, score;

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

function init() {

    var container = document.getElementById('container');

    // Setting the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
    scene.fog = new THREE.Fog( scene.background, 1, 5000);
    scene.add( new THREE.AmbientLight( 0x222233 ));

    // Setting the camera
    camera = new THREE.PerspectiveCamera(30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000 );

    // Hemisphere light
    hLight = new THREE.HemisphereLight(0x505050, 0.05);
    scene.add(hLight);

    // Setting the sky
    

    //Setting the ground
    var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
    var groundMat = new THREE.MeshPhongMaterial( {color: 0x000000, specular: 0xFFFFFF } );
    groundMat.color.setRGB(0.09, 0.09, 0.09);
    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
	ground.position.y = 0;
    ground.receiveShadow = true;
	scene.add( ground );

    // Setting the renderer
    renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    container.appendChild( renderer.domElement );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.shadowMap.renderReverseSided = false;
    document.body.appendChild(renderer.domElement);

    // Setting orbit controls
    var controls = new THREE.OrbitControls (camera, renderer.domElement);
    controls.target.set(23, 0, 24.753);
    controls.update();

    // Load Models and textures
    textureLoader = new THREE.TextureLoader( );
    loader = new THREE.OBJLoader( );
    loadObject('board', 'models/board2.obj', 'textures/board.png');
    loadObject('pacman0', 'models/pacman0.obj', 'textures/pacman.png');
    loadObject('pacman1', 'models/pacman1.obj', 'textures/pacman.png');
    loadObject('pacman2', 'models/pacman2.obj', 'textures/pacman.png');
    loadObject('inky', 'models/ghost.obj', 'textures/inky.png');
    loadObject('blinky', 'models/ghost.obj', 'textures/blinky.png');
    loadObject('pinky', 'models/ghost.obj', 'textures/pinky.png');
    loadObject('clyde', 'models/ghost.obj', 'textures/clyde.png');
    loadObject('inky_blue', 'models/ghost.obj', 'textures/blue.png');
    loadObject('blinky_blue', 'models/ghost.obj', 'textures/blue.png');
    loadObject('pinky_blue', 'models/ghost.obj', 'textures/blue.png');
    loadObject('clyde_blue', 'models/ghost.obj', 'textures/blue.png');

    // Setting score
    canvas = document.getElementById('canvas');
    canvas.style.display = "none";
    ctx = canvas.getContext('2d');

    scoreTex = new THREE.Texture(canvas);
    scoreMat = new THREE.MeshBasicMaterial({map: scoreTex});
    scoreGeo = new THREE.PlaneGeometry(40, 10, 10);
    score = new THREE.Mesh(scoreGeo, scoreMat);

    score.scale.set(1, 1, 1);
    score.position.set(23, 6, -3);
    score.rotateX(-Math.PI / 3);
    scene.add(score);

    // Setting up objects
    setTimeout ( function() {
      setupObjects();
    }, 2000);

}

function setupObjects(){
  board = scene.getObjectByName('board');
  pacman0 = scene.getObjectByName('pacman0');
  pacman1 = scene.getObjectByName('pacman1');
  pacman2 = scene.getObjectByName('pacman2');
  inky = scene.getObjectByName('inky');
  blinky = scene.getObjectByName('blinky');
  pinky = scene.getObjectByName('pinky');
  clyde = scene.getObjectByName('clyde');
  inkyB = scene.getObjectByName('inky_blue');
  blinkyB = scene.getObjectByName('blinky_blue');
  pinkyB = scene.getObjectByName('pinky_blue');
  clydeB = scene.getObjectByName('clyde_blue');

  pacman0.scale.set(1.4, 1.4, 1.4);
  pacman1.scale.set(1.4, 1.4, 1.4);
  pacman2.scale.set(1.4, 1.4, 1.4);
  pacman0.position.y = 1.7;
  pacman1.position.y = 1.7;
  pacman2.position.y = 1.7;
  
  inky.position.y = 1.7;
  inky.scale.set(1.4, 1.4, 1.4);
  inkyB.position.y = 1.7;
  inkyB.scale.set(1.4, 1.4, 1.4);

  blinky.position.y = 1.7;
  blinky.scale.set(1.4, 1.4, 1.4);
  blinkyB.position.y = 1.7;
  blinkyB.scale.set(1.4, 1.4, 1.4);

  pinky.position.y = 1.7;
  pinky.scale.set(1.4, 1.4, 1.4);
  pinkyB.position.y = 1.7;
  pinkyB.scale.set(1.4, 1.4, 1.4);

  clyde.position.y = 1.7;
  clyde.scale.set(1.4, 1.4, 1.4);
  clydeB.position.y = 1.7;
  clydeB.scale.set(1.4, 1.4, 1.4);

  board.scale.set(20, 20, 20);
  board.position.x = 23;
  board.position.z = 24.753;

  board.castShadow = true;
  board.receiveShadow = true;

  camera.position.set (board.position.x, board.position.y + 100, board.position.z + 50);
  camera.lookAt( board.position );

  initDotsAndPellets();
}

function loadObject(modelName, modelPath, texturePath) {
    loader.load( modelPath, function ( object ) {
        var texture = textureLoader.load( texturePath );
        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {
                child.material = new THREE.MeshLambertMaterial;
                child.material.side = THREE.DoubleSide;
                child.material.map = texture;

                if (modelName == 'board'){
                    child.receiveShadow = true;
                }
                else{
                    child.castShadow = true;
                }
            }
        } );

        object.position.x = 0;
        object.position.y = 0;
        object.position.z = 0;
        object.name = modelName;
        scene.add( object );
    });
}

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function createPointLight (size, add_color) {
    var sphere = new THREE.SphereGeometry( size, 16, 8 );

    var light = new THREE.PointLight( add_color, 2, 40 );
    light.add (new THREE.Mesh( sphere, new THREE.MeshBasicMaterial({color: add_color})));

    return light;
}

function animate() {
    updateScore();
    scoreTex.needsUpdate = true;

    requestAnimationFrame( animate );
    render();
}

document.addEventListener('keypress', (event) => {
    var directionKey = event.key;
    switch(directionKey) {
        case 'w':
        case 'ArrowUp':
            direction = Direction.UP;
            break;
        case 'd':
        case 'ArrowRight':
            direction = Direction.RIGHT;
            break;
        case 's':
        case 'ArrowDown':
            direction = Direction.DOWN;
            break;
        case 'a':
        case 'ArrowLeft':
            direction = Direction.LEFT;
            break;
        case 'p':
            myGame.pause = !myGame.pause;
            break;
        default:
            break;
    }
});

function render() {
    counter++;
    if (counter%4 == 0){
      updateDotsAndPellets();
      myGame.update(direction);
    }

    drawGhosts();
    drawPacMan();

    renderer.render( scene, camera );
}

function updateScore(){
    ctx.font = '20pt Arial';
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    var text;
    if (myGame.pacman.lives == 0){
        text = 'G A M E   O V E R'; 
    }
    else if (myGame.score == 2660){
        text = 'Y O U  W I N!';
    }
    else{
        text = 'Lives: ' + myGame.pacman.lives + '      Score: ' + myGame.score;
    }

    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

function drawGhosts(){
  myGame.ghosts.forEach(function(ghost){
      switch (ghost.name) {
          case GhostName.BLINKY:
              renderGhost(blinky, blinkyB, ghost);
              break;
          case GhostName.INKY:
              renderGhost(inky, inkyB, ghost);
              break;
          case GhostName.CLYDE:
              renderGhost(clyde, clydeB, ghost);
              break;
          case GhostName.PINKY:
              renderGhost(pinky, pinkyB, ghost);
              break;
          default:
              break;
      }
  });
}

function renderGhost(normalModel, blueModel, ghost){
  var rem = counter % 4;
  var x = ghost.position.x;
  var y = ghost.position.y;

  /*switch (ghost.direction) {
    case Direction.UP:
        x -= rem * 0.25;
        break;
    case Direction.DOWN:
        x += rem * 0.25;
        break;
    case Direction.LEFT:
        y -= rem * 0.25;
        break;
    case Direction.RIGHT:
        y += rem * 0.25;
        break;
  }*/
  var ghostCoords = getPositionFromArray(x,y);

  normalModel.position.x = ghostCoords.x;
  normalModel.position.z = ghostCoords.y;
  blueModel.position.x = ghostCoords.x;
  blueModel.position.z = ghostCoords.y;
  
  if(ghost.alive){
    if(ghost.state == GhostState.BLUE){
      blueModel.visible = true;
      normalModel.visible = false;
    }else{
      blueModel.visible = false;
      normalModel.visible = true;
    }
  }else{
    blueModel.visible = false;
    normalModel.visible = false;
  }
}

function drawPacMan(){
  //var coords = getPositionFromArray (myGame.pacman.position.x, myGame.pacman.position.y);
  var angle = 0;
  pacman0.visible = false;
  pacman1.visible = false;
  pacman2.visible = false;
  var rem = counter % 4;
  var x = myGame.pacman.position.x;
  var y = myGame.pacman.position.y;

  if (myGame.pacman.moving) {
 /* switch(myGame.pacman.direction){
    case Direction.UP:
      x -= rem * 0.25;
      break;
    case Direction.DOWN:
      x += rem * 0.25;
      break;
    case Direction.LEFT:
      y -= rem * 0.25;
      break;
    case Direction.RIGHT:
      y += rem * 0.25;
      break;
  }*/
  }
  switch(myGame.pacman.direction){
    case Direction.UP:
      angle = (Math.PI/180) * 90;
      break;
    case Direction.DOWN:
      angle = (Math.PI/180) * 270;
      break;
    case Direction.LEFT:
      angle = Math.PI;
      break;
    case Direction.RIGHT:
      break;
  }
  var coords = getPositionFromArray(x, y);
 
  if (!myGame.pacman.alive || myGame.score == 2660 || myGame.pause){
      pacman2.visible = true;
      pacman2.position.x = coords.x;
      pacman2.position.z = coords.y;
      pacman2.rotation.y = angle;
  }
  else{
      switch (counter % 8) {
      case 0:
      case 1:
      case 2:
      case 3:
          pacman2.visible = true;
          pacman2.position.x = coords.x;
          pacman2.position.z = coords.y;
          pacman2.rotation.y = angle;
          break;
      default:
          pacman0.visible = true;
          pacman0.position.x = coords.x;
          pacman0.position.z = coords.y;
          pacman0.rotation.y = angle;
          break;
     }
  }
}

function getPositionFromArray(arrayX, arrayY) {
    var x = arrayY * 1.64 + 0.82; // x
    var y = arrayX * 1.64 + 0.82; // z
    return {x: x, y: y};
}

function initDotsAndPellets(){
    var gameBoard = myGame.map.board;
    for(var i = 0; i < gameBoard.length; i+=1){
        var row = [];
        for(var j = 0; j < gameBoard[0].length; j +=1){
            if(gameBoard[i][j].content == TileContents.DOT){
                var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );
                var dot = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
                var coord = getPositionFromArray(i, j);
                dot.position.x = coord.x;
                dot.position.z = coord.y;
                dot.position.y = 1.7;
                scene.add(dot);
                row.push(dot);
            }else if(gameBoard[i][j].content == TileContents.PELLET){
              var light = createLight(0xFFFCD3);       // 0.6
              var coord = getPositionFromArray(i, j);
              light.position.x = coord.x;
              light.position.z = coord.y;
              light.position.y = 1.7;

              scene.add(light);
              row.push(light);
            }else{
              row.push(null);
            }
        }
        dots.push(row);
    }
}

function createLight(color){
    var pointLight = new THREE.PointLight(color, 1, 30);
    pointLight.castShadow = true;
    pointLight.shadow.camera.near = camera.near;
    pointLight.shadow.camera.far = camera.far;

    var geometry = new THREE.SphereGeometry(0.6, 18, 10);
    var material = new THREE.MeshBasicMaterial({color: color});
    var sphere = new THREE.Mesh(geometry, material);
    pointLight.add(sphere);

    return pointLight;
}

function updateDotsAndPellets(){
  var gameBoard = myGame.map.board;
  for(var i = 0; i < dots.length; i+=1){
    for(var j = 0; j < dots[0].length; j+=1){
      if((gameBoard[i][j].content == TileContents.EMPTY) && (dots[i][j] != null)){
        scene.remove(dots[i][j]);
      }
    }
  }
}

window.onload=function(){
  myGame = new Game(boardPrototype);
  init();
  setTimeout(animate,3000);
}
