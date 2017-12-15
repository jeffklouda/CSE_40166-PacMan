var scene, camera, controls, loader, textureLoader, board;
var board, pacman0, pacman1, pacman2, inky, blinky, pinky, clyde, inkyB, blinkyB, pinkyB, clydeB;
var audioListener, audioLoader;
var begin, chomp, death, ghosteat, intermission;
var myGame;
var direction = Direction.RIGHT;
var pellets = [];
var dots = [];
var renderer;
var counter = 0;
var hLight;
var canvas, ctx, scoreGeo, scoreMat, scoreTex, score;
var target;
var followPacman = false, followInky = false, followBlinky = false, followPinky = false, followClyde = false;

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
    hLight = new THREE.HemisphereLight(0.05);
    scene.add(hLight); 

    //Setting the ground
    var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
    var groundMat = new THREE.MeshPhongMaterial( {color: 0x000000, specular: 0xFFFFFF } );
    groundMat.color.setRGB(0, 0, 0);
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
    renderer.shadowMap.type = THREE.BasicShadowMap

    // Setting orbit controls
    var controls = new THREE.OrbitControls (camera, renderer.domElement);
    controls.target.set(23, 0, 24.753);
    controls.maxPolarAngle = Math.PI / 2;
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

    // Load audio files
    audioListener = new THREE.AudioListener();
    camera.add(audioListener);
    loadSound('chomp', 'audio/pacman_chomp.wav');
    loadSound('begin', 'audio/pacman_beginning.wav');
    loadSound('death', 'audio/pacman_death.wav');
    loadSound('ghosteat', 'audio/pacman_eatghost.wav');
    loadSound('intermission', 'audio/pacman_intermission.wav');

    // Setting score
    canvas = document.getElementById('canvas');
    canvas.style.display = "none";
    ctx = canvas.getContext('2d');

    scoreTex = new THREE.CanvasTexture(canvas);
    scoreMat = new THREE.MeshBasicMaterial({map: scoreTex});
    scoreGeo = new THREE.PlaneGeometry(40, 10, 10);
    score = new THREE.Mesh(scoreGeo, scoreMat);

    score.scale.set(1, 1, 1);
    score.position.set(23, 6, -3);
    score.rotateX(-Math.PI / 3);
    scene.add(score);

    // Setting up objects
    setTimeout ( function() {
      setupSounds();
      setupObjects();
    }, 2000);

}

function loadSound(name, soundFile){
    // Create sound
    var sound = new THREE.Audio(audioListener);

    // Load sound and set attributes
    sound.load(soundFile);
    if (name == 'chomp' || name == 'intermission'){
        sound.loop = true;
    }
    sound.name = name;

    // Add sound to scene
    scene.add(sound);
}

function setupSounds(){
    // Get handles to audio objects
    begin = scene.getObjectByName('begin');
    chomp = scene.getObjectByName('chomp');
    death = scene.getObjectByName('death');
    ghosteat = scene.getObjectByName('ghosteat');
    intermission = scene.getObjectByName('intermission');
}

function setupObjects(){
  // Get handles to model objects
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

  // Set objects initial positions, scales, and orientations
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

  // Set focus of camera
  target = board.position;

  camera.position.set (target.x, target.y + 100, target.z + 50);
  camera.lookAt( target );

  // Add dots and pellets to board
  initDotsAndPellets();
}

function loadObject(modelName, modelPath, texturePath) {
    // Load objects and textures from files
    loader.load( modelPath, function ( object ) {
        var texture = textureLoader.load( texturePath );
        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {
                child.material = new THREE.MeshToonMaterial;
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

        // Initialize object
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
    // Update camera
    if (followPacman || followInky || followBlinky || followPinky || followClyde){
        camera.position.set (target.x, target.y + 50, target.z + 25);
        camera.fov = 20;
        camera.updateProjectionMatrix();
        camera.lookAt( target );
    }

    // Check for any blue ghosts
    var blueghosts = false;
    myGame.ghosts.forEach(
        function(ghost){
            if (ghost.state == GhostState.BLUE){
                blueghosts = true;
            }
        }
    );

    // Play appropriate music for current state of game
    if (blueghosts){
        if (chomp.isPlaying) chomp.stop();
        if (!intermission.isPlaying) intermission.play();

        myGame.ghosts.forEach(
            function(ghost){
                if (!ghost.alive){
                    ghost.alive = true;
                    eatghost();
                }
            }
        );
    }
    else{
        if (intermission.isPlaying) intermission.stop();
    }

    if (!(chomp.isPlaying || death.isPlaying || begin.isPlaying || ghosteat.isPlaying || intermission.isPlaying)
        && !myGame.pause){
        chomp.play();
    };

    // Update score
    updateScore();
    scoreTex.needsUpdate = true;

    // Animate
    requestAnimationFrame( animate );
    render();
}

document.addEventListener('keypress', (event) => {
    var directionKey = event.key;
    switch(directionKey) {
        case 'w':       // Move up
        case 'ArrowUp':
            direction = Direction.UP;
            break;
        case 'd':       // Move right
        case 'ArrowRight':
            direction = Direction.RIGHT;
            break;
        case 's':       // Move down
        case 'ArrowDown':
            direction = Direction.DOWN;
            break;
        case 'a':
        case 'ArrowLeft':       // Move left
            direction = Direction.LEFT;
            break;
        case 'p':       // Pause game
            myGame.pause = !myGame.pause;
            break;
        case 'r':       // Reset camera
            followPacman = false;
            followInky = false;
            followBlinky = false;
            followPinky = false;
            followClyde = false;
            firstperson = false;

            target = board.position;
            pacman0.remove(camera);
            camera.position.set (target.x, target.y + 100, target.z + 50);
            camera.fov = 30;
            camera.updateProjectionMatrix();
            camera.lookAt( target );
            break;
        case 'm':       // Have camera follow pacman
            followPacman = true;
            followInky = false;
            followBlinky = false;
            followPinky = false;
            followClyde = false;
            firstperson = false;
            
            target = pacman0.position; 
            break;
        case 'i':       // Have camear follow inky
            followPacman = false;
            followInky = true;
            followBlinky = false;
            followPinky = false;
            followClyde = false;
            firstperson = false;

            target = inky.position;
            break;
        case 'b':       // Have camera follow blinky
            followPacman = false;
            followInky = false;
            followBlinky = true;
            followPinky = false;
            followClyde = false;
            firstperson = false;

            target = blinky.position;
            break;
        case 'k':       // Have camera follow pinky
            followPacman = false;
            followInky = false;
            followBlinky = false;
            followPinky = true;
            followClyde = false;
            firstperson = false;

            target = pinky.position;
            break;
        case 'y':       // Have camera follow clyde
            followPacman = false;
            followInky = false;
            followBlinky = false;
            followPinky = false;
            followClyde = true;
            firstperson = false;

            target = clyde.position;
            break;
        default:
            break;
    }
});

function render() {
    counter++;
    if (counter%4 == 0){
      // Remove eaten dots and pellts
      updateDotsAndPellets();

      // Handle pacman depending on whether he is dead or alive
      if (myGame.pacman.respawn){
          chomp.stop();
          death.play();
          myGame.update(direction);
      }
      else if (!(myGame.pause || myGame.score == 2660)){
          myGame.update(direction);
      }
    }

    // Handle game depending on whether game is over or paused
    if (!(myGame.pause || myGame.score == 2660)){
        // Game is in action, keep drawing
        drawGhosts();
        drawPacMan();
    }
    else{
        // Game is stopped, do not draw and stop sounds
        if (chomp.isPlaying) chomp.stop();
        if (intermission.isPlaying) intermission.stop();
    }

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
        text = 'Lives: ' + myGame.pacman.lives + '  Score: ' + myGame.score;
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
  // Get current ghost position
  var rem = counter % 4;
  var x = ghost.position.x;
  var y = ghost.position.y;

  // Change ghost position
  switch (ghost.direction) {
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
  }
  
  // Update ghost position
  var ghostCoords = getPositionFromArray(x,y);

  normalModel.position.x = ghostCoords.x;
  normalModel.position.z = ghostCoords.y;
  blueModel.position.x = ghostCoords.x;
  blueModel.position.z = ghostCoords.y;

  // Update ghost appearance
  if(ghost.state == GhostState.BLUE){
      blueModel.visible = true;
      normalModel.visible = false;
  }else{
      blueModel.visible = false;
      normalModel.visible = true;
  }
}

function drawPacMan(){
  // Initialize variables
  var angle = 0;
  pacman0.visible = false;
  pacman1.visible = false;
  pacman2.visible = false;

  // Get current pacman position
  var rem = counter % 4;
  var x = myGame.pacman.position.x;
  var y = myGame.pacman.position.y; 

  // Change pacman position
  if (myGame.pacman.direction != Direction.STAY) {
  switch(myGame.pacman.direction){
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
  }
  }
  
  // Change pacman angle
  switch(myGame.pacman.lastDirection){
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

  if (followPacman){
      camera.position.set (target.x, target.y + 100, target.z + 50);
      camera.lookAt( target );
      
      pacman0.position.x = coords.x;
      pacman0.position.z = coords.y;
      pacman0.rotation.y = angle;
  }

  // Update current pacman position and appearance
  if (!myGame.pacman.alive || myGame.score == 2660 || myGame.pause){
      if (chomp.isPlaying) chomp.stop();
      if (intermission.isPlaying) intermission.stop();

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

function startup(){
    begin.play();
    render();
    setTimeout(animate, 4000);    
}

function death(){
    chomp.stop();
    death.play();
    setTimeout(animate, 4000);
}

function eatghost(){
    chomp.stop();
    ghosteat.play();
    setTimeout(animate, 4000);
}

window.onload=function(){
  myGame = new Game(boardPrototype);
  init();

  setTimeout(startup,3000);
}
