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
const material = new THREE.ShaderMaterial({
    vertexShader: `
    uniform float angle;

    void main() {

        mat4 rotationMatrixX = mat4(
            1.0, 0.0, 0.0, 0.0,
            0.0, cos(-angle), -sin(-angle), 0.0,
            0.0, sin(-angle), cos(-angle), 0.0,
            0.0, 0.0, 0.0, 1.0
          );
        
          // Rotation matrix around the Y axis
          mat4 rotationMatrixY = mat4(
            cos(angle), 0.0, sin(angle), 0.0,
            0.0, 1.0, 0.0, 0.0,
            -sin(angle), 0.0, cos(angle), 0.0,
            0.0, 0.0, 0.0, 1.0
          );

          mat4 rotationMatrixZ = mat4(
            cos(-angle), -sin(-angle), 0.0, 0.0,
            sin(-angle), cos(-angle), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
          );

        mat4 rotationMatrix = rotationMatrixX * rotationMatrixY * rotationMatrixZ;

        vec4 rotatedPosition = rotationMatrix * vec4(position, 1.0);

        gl_Position = projectionMatrix * modelViewMatrix * rotatedPosition;
    }
    `,
    fragmentShader: `
        uniform float angle;

        void main() {
            float colorMix = sin(angle * 2.0) * 0.5 + 0.5;
            vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.9, 0.35, 0.9), colorMix);
            gl_FragColor = vec4(color, 1.0);
        }
    `,
    uniforms: {
        angle: { value: 0 },
    },
});

//Cube
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    material,
);
scene.add(cube);

//Animation
animate();
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    material.uniforms.angle.value += 0.01;
    renderer.render(scene, camera);
}