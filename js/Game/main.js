
/*var scene, camera, controls, stats;
var renderer;

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

init();
animate();

function init() {

    var container = document.getElementById('container');

    stats = new Stats();
    container.appendChild( stats.dom );

    renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    container.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );

    camera = new THREE.PerspectiveCamera( 30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000 );
    camera.position.set (0, 0, 250);
}

window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );
    render();

}

function render() {

    stats.update();
    renderer.render( scene, camera );

}
*/
