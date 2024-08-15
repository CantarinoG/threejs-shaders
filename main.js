//Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(0, 0, 3);

//Controls
const controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.staticMoving = true;

//Shaders
let material;
Promise.all([
    fetch("./shaders/vertex.glsl").then(response => response.text()),
    fetch("./shaders/fragment.glsl").then(response => response.text()),
]).then(([vertexShader, fragmentShader]) => {

    //Cube    
    material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            angle: { value: 0 },
        },
    });
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(),
        material,
    );
    scene.add(cube);
});


//Animation
animate();
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (material != null) {
        material.uniforms.angle.value += 0.01;
    }
    renderer.render(scene, camera);
}