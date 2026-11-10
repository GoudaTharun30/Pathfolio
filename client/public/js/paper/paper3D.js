/**
 * Pathfolio Paper World — 3D Educational Objects Engine
 * Procedural low-poly 3D floating sketchbook, pencils, graduation cap, and lightbulb
 * Built with Three.js (procedural geometry, no heavy external model downloads)
 */
const paper3D = {
  activeInstances: {},

  initHeroCanvas(containerId = 'landing-3d-canvas') {
    const container = document.getElementById(containerId);
    if (!container || !window.THREE) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.renderFallback(container);
      return;
    }

    try {
      const width = container.clientWidth || 360;
      const height = container.clientHeight || 320;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 7.5);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // Lighting — Warm ambient paper light
      const ambientLight = new THREE.AmbientLight(0xFFF9EE, 0.95);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.85);
      dirLight.position.set(5, 8, 6);
      scene.add(dirLight);

      // Group for all floating educational objects
      const group = new THREE.Group();
      scene.add(group);

      // 1. Procedural 3D Notebook
      const bookGroup = new THREE.Group();
      // Cover (Sketch cream with ink trim)
      const coverGeo = new THREE.BoxGeometry(2.2, 3.0, 0.08);
      const coverMat = new THREE.MeshLambertMaterial({ color: 0xF3E5A8 }); // pastel yellow notebook
      const coverMesh = new THREE.Mesh(coverGeo, coverMat);
      bookGroup.add(coverMesh);

      // Inner Pages (White paper block)
      const pagesGeo = new THREE.BoxGeometry(2.05, 2.9, 0.22);
      const pagesMat = new THREE.MeshLambertMaterial({ color: 0xFFFEFA });
      const pagesMesh = new THREE.Mesh(pagesGeo, pagesMat);
      pagesMesh.position.set(0.05, 0, 0.1);
      bookGroup.add(pagesMesh);

      // Spiral Ring Wire Binding
      for (let i = -1.2; i <= 1.2; i += 0.3) {
        const ringGeo = new THREE.TorusGeometry(0.12, 0.025, 8, 16);
        const ringMat = new THREE.MeshLambertMaterial({ color: 0x171717 });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.set(-1.08, i, 0.12);
        ringMesh.rotation.y = Math.PI / 2;
        bookGroup.add(ringMesh);
      }

      bookGroup.position.set(-0.6, 0.1, 0);
      bookGroup.rotation.set(0.2, -0.4, 0.1);
      group.add(bookGroup);

      // 2. Procedural 3D Pencil
      const pencilGroup = new THREE.Group();
      // Pencil Body (Hexagonal cylinder)
      const pencilGeo = new THREE.CylinderGeometry(0.09, 0.09, 2.2, 6);
      const pencilMat = new THREE.MeshLambertMaterial({ color: 0xF59E0B }); // yellow pencil
      const pencilMesh = new THREE.Mesh(pencilGeo, pencilMat);
      pencilGroup.add(pencilMesh);

      // Wood Tip Cone
      const coneGeo = new THREE.ConeGeometry(0.09, 0.35, 6);
      const coneMat = new THREE.MeshLambertMaterial({ color: 0xE2C299 });
      const coneMesh = new THREE.Mesh(coneGeo, coneMat);
      coneMesh.position.y = 1.275;
      pencilGroup.add(coneMesh);

      // Lead tip
      const leadGeo = new THREE.ConeGeometry(0.035, 0.12, 6);
      const leadMat = new THREE.MeshLambertMaterial({ color: 0x171717 });
      const leadMesh = new THREE.Mesh(leadGeo, leadMat);
      leadMesh.position.y = 1.4;
      pencilGroup.add(leadMesh);

      // Eraser
      const eraserGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.25, 8);
      const eraserMat = new THREE.MeshLambertMaterial({ color: 0xFB7185 }); // pink eraser
      const eraserMesh = new THREE.Mesh(eraserGeo, eraserMat);
      eraserMesh.position.y = -1.22;
      pencilGroup.add(eraserMesh);

      pencilGroup.position.set(1.5, -0.5, 0.6);
      pencilGroup.rotation.set(0.4, 0.3, -0.6);
      group.add(pencilGroup);

      // 3. Floating Graduation Cap
      const capGroup = new THREE.Group();
      const capTopGeo = new THREE.BoxGeometry(1.2, 0.05, 1.2);
      const capMat = new THREE.MeshLambertMaterial({ color: 0x171717 });
      const capTop = new THREE.Mesh(capTopGeo, capMat);
      capGroup.add(capTop);

      const skullGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 12);
      const skull = new THREE.Mesh(skullGeo, capMat);
      skull.position.y = -0.2;
      capGroup.add(skull);

      capGroup.position.set(1.4, 1.3, -0.4);
      capGroup.rotation.set(0.3, -0.4, 0.2);
      group.add(capGroup);

      // Mouse Parallax
      let mouseX = 0, mouseY = 0;
      let targetX = 0, targetY = 0;

      const onMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
        mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
      };

      window.addEventListener('mousemove', onMouseMove);

      let animId;
      let clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Sinusoidal floating levitation
        bookGroup.position.y = 0.1 + Math.sin(elapsedTime * 1.5) * 0.12;
        bookGroup.rotation.y = -0.4 + Math.sin(elapsedTime * 1.1) * 0.08;

        pencilGroup.position.y = -0.5 + Math.cos(elapsedTime * 1.8) * 0.14;
        pencilGroup.rotation.z = -0.6 + Math.sin(elapsedTime * 1.3) * 0.1;

        capGroup.position.y = 1.3 + Math.sin(elapsedTime * 1.4 + 1) * 0.1;
        capGroup.rotation.y = -0.4 + Math.cos(elapsedTime * 0.9) * 0.12;

        // Smooth mouse tracking
        targetX += (mouseX * 0.5 - targetX) * 0.05;
        targetY += (mouseY * 0.5 - targetY) * 0.05;
        group.rotation.y = targetX * 0.4;
        group.rotation.x = -targetY * 0.4;

        renderer.render(scene, camera);
      };

      animate();

      this.activeInstances[containerId] = {
        destroy() {
          cancelAnimationFrame(animId);
          window.removeEventListener('mousemove', onMouseMove);
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        }
      };
    } catch (err) {
      console.warn('3D WebGL initialization skipped:', err);
      this.renderFallback(container);
    }
  },

  renderFallback(container) {
    container.innerHTML = `
      <div style="font-size: 5rem; text-align: center; animation: paperFoldFlip 3s infinite ease-in-out;">
        📓✏️🎓
      </div>
    `;
  }
};

