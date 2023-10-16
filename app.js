import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Define the Sketch class
export default class Sketch {
  constructor(options) {
    // The DOM container where the scene will be rendered
    this.container = options.domElement;
    this.width = this.container.offsetWidth; // Container width
    this.height = this.container.offsetHeight; // Container height

    // Create a perspective camera
    this.camera = new THREE.PerspectiveCamera(
      70, // Field of view in degrees
      this.width / this.height, // Aspect ratio
      0.01, // Near clipping plane
      10 // Far clipping plane
    );
    this.camera.position.z = 1; // Camera position in depth

    // Create a Three.js scene
    this.scene = new THREE.Scene();

    // Create a WebGL renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio
    this.renderer.setSize(this.width, this.height); // Render size

    // Add the renderer to the DOM container
    this.container.appendChild(this.renderer.domElement);

    // Orbit controls for interacting with the scene
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.time = 0; // Time for animation
    this.addObjects(); // Add objects to the scene
    this.render(); // Start rendering
    this.setupResize(); // Set up window resize handling
  }

  // Function to handle window resizing
  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  // Set up window resize event listener
  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  // Function to add objects to the scene
  addObjects() {
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2); // Cube geometry
    const material = new THREE.MeshNormalMaterial(); // Material with colors based on normals

    this.mesh = new THREE.Mesh(geometry, material); // Create mesh with geometry and material
    this.scene.add(this.mesh); // Add the mesh to the scene
  }

  // Function to continuously render the scene
  render() {
    this.time += 0.05; // Update time for animation
    this.mesh.rotation.x = this.time / 2000; // Rotate on the x-axis
    this.mesh.rotation.y = this.time / 1000; // Rotate on the y-axis

    this.renderer.render(this.scene, this.camera); // Render the scene

    requestAnimationFrame(this.render.bind(this)); // Request the next frame
  }
}

// Create an instance of the Sketch class with the DOM container "container"
new Sketch({
  domElement: document.getElementById("container"),
});
