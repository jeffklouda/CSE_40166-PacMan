
var scene, camera, controls, loader, textureLoader, board;
var board, pacman0, pacman1, pacman2, inky, blinky, pinky, clyde;
var game, direction;
var pellets = [];
var dots = [];
var renderer;
var counter = 0;

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
    camera = new THREE.PerspectiveCamera( 30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000 );
    camera.position.set (22.5, 250, 125);
    camera.lookAt( 23, 0, 24.753);

    //Setting the ground
    var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
    var groundMat = new THREE.MeshPhongMaterial( {color: 0x000000, specular: 0xFFFFFF } );
    groundMat.color.setRGB(0.1, 0.1,0.1);
    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
	  ground.position.y = -33;
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
    renderer.shadowMap.renderReverseSided = false;

    // Setting orbit controls
    var controls = new THREE.OrbitControls (camera, renderer.domElement);
    controls.target.set(23, 0, 24.753);
    controls.update();

    // Load Models and textures
    textureLoader = new THREE.TextureLoader( );
    loader = new THREE.OBJLoader( );
    loadObject('board', '../models/board2.obj', '../textures/board.png');
    loadObject('pacman0', '../models/pacman0.obj', '../textures/pacman.png');
    loadObject('pacman1', '../models/pacman1.obj', '../textures/pacman.png');
    loadObject('pacman2', '../models/pacman2.obj', '../textures/pacman.png');
    loadObject('inky', '../models/ghost.obj', '../textures/inky.png');
    loadObject('blinky', '../models/ghost.obj', '../textures/blinky.png');
    loadObject('pinky', '../models/ghost.obj', '../textures/pinky.png');
    loadObject('clyde', '../models/ghost.obj', '../textures/clyde.png');

    setTimeout ( function() {
      setupObjects();
    }, 5000);

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

  pacman0.scale.set(1.4, 1.4, 1.4);
  pacman1.scale.set(1.4, 1.4, 1.4);
  pacman2.scale.set(1.4, 1.4, 1.4);
  pacman0.position.y = 1.7;
  pacman1.position.y = 1.7;
  pacman2.position.y = 1.7;

  inky.position.y = 1.7;
  inky.scale.set(1.4, 1.4, 1.4);

  blinky.position.y = 1.7;
  blinky.scale.set(1.4, 1.4, 1.4);

  pinky.position.y = 1.7;
  pinky.scale.set(1.4, 1.4, 1.4);

  clyde.position.y = 1.7;
  clyde.scale.set(1.4, 1.4, 1.4);

  board.scale.set(20, 20, 20);
  board.position.x = 23;
  board.position.z = 24.753;

  initDotsAndPellets();
}

function loadObject(modelName, modelPath, texturePath) {
    loader.load( modelPath, function ( object ) {
        console.log(object);
        var texture = textureLoader.load( texturePath );
        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {
                child.material.side = THREE.DoubleSide;
                child.material.map = texture;
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
        default:

    }
});

function render() {
    counter++;
    if (counter%4 == 0){
      updateDotsAndPellets();
      game.update(direction);
    }

    drawGhosts();
    drawPacMan();

    renderer.render( scene, camera );

}

function drawGhosts(){
  game.ghosts.forEach(function(ghost){
      var ghostCoords = getPositionFromArray (ghost.position.x, ghost.position.y);
      switch (ghost.name) {
          case GhostName.BLINKY:
              blinky.position.x = ghostCoords.x;
              blinky.position.z = ghostCoords.y;
              //TODO if(ghost.state == GhostState.BLUE) draw blue ghost
              break;
          case GhostName.INKY:
              inky.position.x = ghostCoords.x;
              inky.position.z = ghostCoords.y;
              break;
          case GhostName.CLYDE:
              clyde.position.x = ghostCoords.x;
              clyde.position.z = ghostCoords.y;
              break;
          case GhostName.PINKY:
              pinky.position.x = ghostCoords.x;
              pinky.position.z = ghostCoords.y;
              break;
          default:
              break;
      }
  });
}

function drawPacman(){
  var coords = getPositionFromArray (game.pacman.position.x, game.pacman.position.y);

  pacman0.visible = false;
  pacman1.visible = false;
  pacman2.visible = false;
  switch (counter % 8) {
      case 0:
      case 1:
      case 2:
      case 3:
          pacman2.visible = true;
          pacman2.position.x = coords.x;
          pacman2.position.z = coords.y;
          break;
      default:
          pacman0.visible = true;
          pacman0.position.x = coords.x;
          pacman0.position.z = coords.y;
          break;
  }
}

function getPositionFromArray(arrayX, arrayY) {
    var x = arrayY * 1.64 + 0.82; // x
    var y = arrayX * 1.64 + 0.82; // z
    return {x: x, y: y};
}

function initDotsAndPellets(){
    var gameBoard = game.map.board;
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
              var light = createPointLight(0.55, 0xFFFCD3);
              var coord = getPositionFromArray(i, j);
              scene.add(light);
              light.position.x = coord.x;
              light.position.z = coord.y;
              light.position.y = 1.7;
              row.push(light);
            }else{
                row.push(null);
            }
        }
        dots.push(row);
    }
}

function updateDotsAndPellets(){
  var gameBoard = game.map.board;
  for(var i = 0; i < dots.length; i+=1){
    for(var j = 0; j < dots[i].length; j+=1){
      if((gameBoard[i][j].content == TileContents.EMPTY) && (dots[i][j] != null)){
        dots[i][j].visible = false;
      }
    }
  }
}

game = new Game(boardPrototype);
init();

setTimeout(animate,2000);
