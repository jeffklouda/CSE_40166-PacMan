
var scene, camera, controls, stats;
var renderer;

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

//init(scene, camera, stats);
//animate();

function init() {

    var container = document.getElementById('container');

    stats = new Stats();
    container.appendChild( stats.dom );

    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
    scene.fog = new THREE.Fog( scene.background, 1, 5000);
    scene.add( new THREE.AmbientLight( 0x222233 ));

    //camera = new THREE.PerspectiveCamera( 30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000 );
    //camera = new THREE.OrthographicCamera(SCREEN_WIDTH / -2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / -2, 0, 1000)
    camera = new THREE.OrthographicCamera(-100, 100, -100, 100, 0, 1000)
    camera.position.set (0, 250, 0);
    camera.lookAt( scene.position );


    var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
    var groundMat = new THREE.MeshPhongMaterial( {color: 0xffffff, specular: 0x050505 } );
    groundMat.color.setHSL( 0.095, 1, 0.75 );

    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
	ground.position.y = -33;
	scene.add( ground );

    ground.receiveShadow = true;

    renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    container.appendChild( renderer.domElement );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;

    var textureLoader = new THREE.TextureLoader( );
    var texture = textureLoader.load( '../textures/pacman.png' );

    var loader = new THREE.OBJLoader( );
    loader.load( '../models/board.obj', function ( object ) {
    	object.traverse( function ( child ) {

    		if ( child instanceof THREE.Mesh ) {
                child.material.side = THREE.DoubleSide;
    			//child.material.map = texture;
    		}
    	} );
        object.scale.set(50,50,50);
    	object.position.y = 0;
        object.position.z = 0;
        //object.rotation.x = 1.6;
        //object.rotation.y = 3.14;
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

    var light = new THREE.PointLight( add_color, 2, 50 );
    light.add (new THREE.Mesh( sphere, new THREE.MeshBasicMaterial({color: add_color})));
    scene.add (light);

    return light;
}

function animate() {

    requestAnimationFrame( animate );
    render();

}

var DateLast, game, pacLight, gLight1, gLight2, direction;

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
    console.log(directionKey);
});

function render() {

    if (Date.now()%10 == 0) {

        game.update(direction);
        //console.log("Pac-Man:", game.pacman.position);
        //console.log(game);
        game.ghosts.forEach(function(ghost){
            //console.log("Ghost:", ghost.position);
        });
    }
    gLight1.position.y = game.ghosts[0].position.x * 2;
    gLight1.position.x = game.ghosts[0].position.y * 2;
    gLight2.position.y = game.ghosts[1].position.x * 2;
    gLight2.position.x = game.ghosts[1].position.y * 2;
    pacLight.position.y = game.pacman.position.x * 2;
    pacLight.position.x = game.pacman.position.y * 2;
    stats.update();
    renderer.render( scene, camera );

}

init();
DateLast = 0;
game = new Game(boardPrototype);
pacLight = createPointLight (2, 0xffff00);
gLight1 = createPointLight(2, 0xff0000);
gLight2 = createPointLight(2, 0x00ff00);
animate();
//console.log("");

//console.log(game.deployments.activeGhosts[1]);
//console.log(game.ghosts[1]);
//console.log(game.deployments.activeGhosts[1] == game.ghosts[1]);
