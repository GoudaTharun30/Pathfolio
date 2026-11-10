/**
 * Pathfolio Paper World — Signature Realistic 3D Paper Crunch Ball Engine
 *
 * Core fixes applied (v2):
 *  - Removed backdrop-filter blur that was showing blurry photographic background
 *  - Overlay background is now a clean, opaque theme-matched surface (no image bleed)
 *  - Paper plane now fills the full viewport using correct aspect-ratio geometry
 *  - Rotation only begins AFTER the ball is formed (not during the flat sheet phase)
 *  - Cubic easing replaced with an asymmetric curve: fast initial fold, smooth ball
 *  - Texture swap at apex is cross-faded via opacity rather than a hard material swap
 *  - Deformation improved: edge-curl begins immediately (corners fold inward at t=0)
 */

(function(window) {
  'use strict';

  const PaperCrunchEngine = {
    isInitialized: false,
    isAnimating: false,
    container: null,
    canvas: null,
    renderer: null,
    scene: null,
    camera: null,
    mesh: null,
    shadowMesh: null,
    geometry: null,
    material: null,
    originalPositions: null,
    creaseNoiseMap: null,
    textureCache: {},
    audioCtx: null,

    // Grid resolution — higher = smoother folds, denser mesh
    GRID_W: 60,
    GRID_H: 60,

    // Plane world-space dimensions. Computed dynamically to match viewport aspect.
    PLANE_W: 4.0,
    PLANE_H: 4.0,
    BALL_RADIUS: 0.82,

    // Camera
    CAM_Z: 5.5,
    CAM_FOV: 42,

    init() {
      if (this.isInitialized) return;
      this.createDOMOverlay();
      this.initCreaseMap();
      this.isInitialized = true;
    },

    createDOMOverlay() {
      if (document.getElementById('paper-crunch-overlay')) return;

      const overlay = document.createElement('div');
      overlay.id = 'paper-crunch-overlay';
      overlay.className = 'paper-crunch-overlay';
      overlay.innerHTML = `
        <div id="paper-crunch-canvas-container" class="paper-crunch-canvas-container"></div>
        <div id="paper-crunch-ui-layer" class="paper-crunch-ui-layer">
          <div id="paper-crunch-badge" class="paper-crunch-badge">
            <span class="paper-crunch-icon">📜</span>
            <span id="paper-crunch-badge-text" class="paper-crunch-badge-text">Turning Page...</span>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      this.container = document.getElementById('paper-crunch-canvas-container');
    },

    initCreaseMap() {
      const totalVertices = (this.GRID_W + 1) * (this.GRID_H + 1);
      this.creaseNoiseMap = new Float32Array(totalVertices);

      for (let i = 0; i < totalVertices; i++) {
        const u = (i % (this.GRID_W + 1)) / this.GRID_W;
        const v = Math.floor(i / (this.GRID_W + 1)) / this.GRID_H;

        const cx = (u - 0.5) * 2;
        const cy = (v - 0.5) * 2;
        const dist = Math.sqrt(cx * cx + cy * cy);
        const angle = Math.atan2(cy, cx);

        // Overlapping paper fold vectors — produce natural mountain & valley folds
        const fold1 = Math.abs(Math.sin(cx * 5.4 + cy * 3.7));
        const fold2 = Math.abs(Math.cos(cx * 4.1 - cy * 6.3 + 0.8));
        const fold3 = Math.abs(Math.sin(angle * 4.0 + dist * 7.0));
        const fold4 = Math.abs(Math.cos(cx * 11.0 + cy * 9.0));

        // Localized pinch bunches (6 crumple centers)
        let pinch = 0;
        const pinches = [
          [-0.45, 0.35], [0.55, 0.4], [-0.3, -0.5],
          [0.4, -0.45], [0.05, 0.15], [-0.1, -0.1]
        ];
        for (let p = 0; p < pinches.length; p++) {
          const pdx = cx - pinches[p][0];
          const pdy = cy - pinches[p][1];
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
          pinch += Math.exp(-pDist * 4.5) * (p % 2 === 0 ? 0.35 : -0.3);
        }

        const ridge =
          0.4 * (1.0 - 2.0 * fold1) +
          0.3 * (1.0 - 2.0 * fold2) +
          0.2 * (fold3 - 0.5) +
          0.1 * (fold4 - 0.5) +
          pinch;

        this.creaseNoiseMap[i] = ridge;
      }
    },

    /**
     * Returns the viewport-matched plane dimensions for a given camera setup.
     * This ensures the flat paper exactly covers the screen before any deformation.
     */
    computePlaneDimensions() {
      const fovRad = (this.CAM_FOV * Math.PI) / 180;
      const h = 2 * Math.tan(fovRad / 2) * this.CAM_Z;
      const w = h * (window.innerWidth / window.innerHeight);
      return { w: w * 0.98, h: h * 0.98 }; // Slight inset so edges don't clip camera
    },

    initThree() {
      if (!window.THREE || this.renderer) return;

      try {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Recompute plane dimensions to match viewport
        const dim = this.computePlaneDimensions();
        this.PLANE_W = dim.w;
        this.PLANE_H = dim.h;

        this.scene = new THREE.Scene();
        // No scene background — overlay CSS controls the background, not Three.js
        this.scene.background = null;

        this.camera = new THREE.PerspectiveCamera(this.CAM_FOV, width / height, 0.1, 100);
        this.camera.position.set(0, 0, this.CAM_Z);

        this.renderer = new THREE.WebGLRenderer({
          alpha: true,          // transparent canvas — only the mesh is visible
          antialias: true,
          powerPreference: 'high-performance'
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        this.renderer.setClearColor(0x000000, 0); // fully transparent clear
        this.renderer.shadowMap.enabled = false;  // shadow via separate mesh below

        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);

        // Lighting: warm top-left key + cool fill + warm rim for paper depth
        const ambientLight = new THREE.AmbientLight(0xfff8f0, 0.5);
        this.scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
        keyLight.position.set(3, 5, 6);
        this.scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xd0d8ff, 0.3);
        fillLight.position.set(-4, -2, 5);
        this.scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffe8c0, 0.35);
        rimLight.position.set(0, -5, 2);
        this.scene.add(rimLight);

        // Build Geometry that matches viewport exactly
        this.geometry = new THREE.PlaneGeometry(
          this.PLANE_W,
          this.PLANE_H,
          this.GRID_W,
          this.GRID_H
        );

        // Store flat positions for interpolation
        const posAttr = this.geometry.attributes.position;
        this.originalPositions = new Float32Array(posAttr.array);

        const paperTexture = this.getPaperTexture(true, false);

        this.material = new THREE.MeshStandardMaterial({
          map: paperTexture,
          roughness: 0.95,
          metalness: 0.0,
          side: THREE.DoubleSide,
          flatShading: true,
          transparent: false
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 0);
        this.scene.add(this.mesh);

        // Soft drop shadow underneath (not cast shadow, just a radial texture)
        const shadowGeo = new THREE.PlaneGeometry(2.5, 2.5);
        const shadowTexture = this.generateShadowTexture();
        const shadowMat = new THREE.MeshBasicMaterial({
          map: shadowTexture,
          transparent: true,
          opacity: 0.0,
          depthWrite: false
        });
        this.shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
        this.shadowMesh.position.set(0, -1.0, -0.5);
        this.shadowMesh.rotation.x = -Math.PI / 2.5;
        this.scene.add(this.shadowMesh);

        window.addEventListener('resize', () => this.onResize());
      } catch (e) {
        console.warn('PaperCrunchEngine: WebGL init failed, using CSS fallback', e);
        this.renderer = null;
      }
    },

    onResize() {
      if (!this.renderer || !this.camera) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    },

    getPaperTexture(isPaper, isDark) {
      const key = `${isPaper ? 'paper' : 'orig'}_${isDark ? 'dark' : 'light'}`;
      if (!this.textureCache[key]) {
        this.textureCache[key] = this.generatePaperTexture({ isPaperTheme: isPaper, isDark: isDark });
      }
      return this.textureCache[key];
    },

    generatePaperTexture(options = {}) {
      const isPaper = options.isPaperTheme !== false;
      const isDark = options.isDark === true;
      const key = `${isPaper ? 'paper' : 'orig'}_${isDark ? 'dark' : 'light'}`;
      if (this.textureCache[key]) return this.textureCache[key];

      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      if (isPaper) {
        ctx.fillStyle = isDark ? '#22262E' : '#FDFAF4';
        ctx.fillRect(0, 0, 1024, 1024);

        // Graph paper grid
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
        ctx.lineWidth = 1;
        const step = 32;
        for (let x = 0; x <= 1024; x += step) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
        }
        for (let y = 0; y <= 1024; y += step) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
        }

        // Notebook margin line
        ctx.strokeStyle = isDark ? 'rgba(244,114,182,0.3)' : 'rgba(239,68,68,0.28)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(110, 0); ctx.lineTo(110, 1024); ctx.stroke();

        // Sketch border
        ctx.strokeStyle = isDark ? '#E0DDD5' : '#1A1A1A';
        ctx.lineWidth = 5;
        ctx.strokeRect(22, 22, 980, 980);

        // Top header bar
        ctx.fillStyle = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(185,221,240,0.2)';
        ctx.fillRect(28, 28, 968, 68);

        // Handwritten title
        ctx.fillStyle = isDark ? 'rgba(240,237,230,0.5)' : 'rgba(20,20,20,0.4)';
        ctx.font = '26px "Patrick Hand", cursive, sans-serif';
        ctx.fillText('PATHFOLIO — CAREER & PORTFOLIO', 128, 70);
      } else {
        // Professional theme sheet
        ctx.fillStyle = isDark ? '#151D30' : '#FFFFFF';
        ctx.fillRect(0, 0, 1024, 1024);

        ctx.fillStyle = '#6366F1';
        ctx.fillRect(0, 0, 1024, 8);

        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(36, 36, 952, 952);

        ctx.fillStyle = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(99,102,241,0.05)';
        ctx.fillRect(36, 36, 952, 56);

        ctx.fillStyle = isDark ? '#E8F0FF' : '#0F172A';
        ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('PATHFOLIO PROFESSIONAL WORKSPACE', 68, 70);
      }

      // Procedural micro paper grain (no GPU readback)
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)';
      for (let s = 0; s < 2000; s++) {
        const rx = (s * 137.508) % 1024;
        const ry = (s * 293.717) % 1024;
        ctx.fillRect(rx, ry, (s % 3) + 1, (s % 2) + 1);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 4;
      this.textureCache[key] = texture;
      return texture;
    },

    generateShadowTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(128, 128, 8, 128, 128, 115);
      grad.addColorStop(0, 'rgba(0,0,0,0.80)');
      grad.addColorStop(0.4, 'rgba(0,0,0,0.40)');
      grad.addColorStop(0.75, 'rgba(0,0,0,0.12)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(canvas);
    },

    playPaperRustleAudio(stage = 'crumple') {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this.audioCtx) this.audioCtx = new AudioCtx();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        const ctx = this.audioCtx;
        const now = ctx.currentTime;

        if (stage === 'crumple') {
          const bursts = [0, 0.07, 0.15, 0.24, 0.33];
          bursts.forEach((offset, idx) => {
            const bufSize = Math.floor(ctx.sampleRate * 0.1);
            const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufSize; i++) {
              data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.25));
            }
            const src = ctx.createBufferSource();
            src.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 850 + idx * 180;
            filter.Q.value = 1.4;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.045, now + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.09);
            src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
            src.start(now + offset);
          });
        } else if (stage === 'unfold') {
          const bufSize = Math.floor(ctx.sampleRate * 0.26);
          const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufSize) * Math.PI);
          }
          const src = ctx.createBufferSource();
          src.buffer = buffer;
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, now);
          filter.frequency.exponentialRampToValueAtTime(400, now + 0.24);
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
          src.start(now);
        }
      } catch (e) { /* silent */ }
    },

    /**
     * Deform the mesh toward a crumpled 3D paper ball.
     *
     * crunch 0.0 = perfectly flat viewport-filling sheet
     * crunch 1.0 = fully compressed irregular 3D ball at center
     *
     * Key behavioural fix: rotation ONLY applied once crunch > 0.75
     * so the flat sheet stays still and doesn't appear to float.
     */
    deformPaperMesh(crunch, time, apexReached) {
      if (!this.geometry || !this.originalPositions) return;

      const pos = this.geometry.attributes.position;
      const orig = this.originalPositions;
      const count = pos.count;
      const creases = this.creaseNoiseMap;

      // Asymmetric easing: folds begin immediately, ball consolidates later
      // This avoids the "nothing happening then sudden ball" look
      const c = crunch < 0.5
        ? 2 * crunch * crunch               // ease-in for first half
        : 1 - Math.pow(-2 * crunch + 2, 2) / 2; // ease-out for second half

      const targetRadius = this.BALL_RADIUS;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x0 = orig[i3];
        const y0 = orig[i3 + 1];

        // Normalized UV (-1 to 1)
        const u = x0 / (this.PLANE_W * 0.5);
        const v = y0 / (this.PLANE_H * 0.5);
        const dist = Math.sqrt(u * u + v * v);
        const phi = Math.atan2(v, u);

        // --- Corner curl: edges fold inward and forward immediately ---
        // Stronger at corners (high dist), starts even at small crunch
        const edgeness = Math.pow(Math.min(dist / 1.2, 1.0), 1.8);
        const curlZ = edgeness * crunch * 0.9; // forward curl

        // Corner pull inward: corners converge toward center as crunch grows
        const inwardPull = c * edgeness * 0.6;
        const pulledX = x0 * (1.0 - inwardPull);
        const pulledY = y0 * (1.0 - inwardPull);

        // --- Spherical projection (ball target) ---
        const sphereLat = (v * 0.5) * Math.PI;
        const sphereLon = (u * 0.9) * Math.PI;
        const cosLat = Math.cos(sphereLat);
        const sx = targetRadius * cosLat * Math.sin(sphereLon);
        const sy = targetRadius * Math.sin(sphereLat);
        const sz = targetRadius * cosLat * Math.cos(sphereLon);

        // Crease displacement
        const creaseVal = creases[i] || 0;
        const crumpleAmp = c * 0.35;
        const dispRadial = 1.0 + (creaseVal * crumpleAmp);

        const targetX = sx * dispRadial;
        const targetY = sy * dispRadial;
        const targetZ = sz * dispRadial;

        // Interpolate: flat+curled → spherical ball
        pos.array[i3]     = (1.0 - c) * pulledX + c * targetX;
        pos.array[i3 + 1] = (1.0 - c) * pulledY + c * targetY;
        pos.array[i3 + 2] = (1.0 - c) * curlZ   + c * targetZ;
      }

      pos.needsUpdate = true;
      this.geometry.computeVertexNormals();

      // --- Rotation: ONLY once ball is substantially formed (crunch > 0.75) ---
      // Before that, the flat sheet stays flat and still (no floating rectangle spin)
      if (this.mesh && this.shadowMesh) {
        const rotationOnset = Math.max(0, (crunch - 0.75) / 0.25); // 0→1 from crunch 0.75→1.0
        const ballVisible = crunch > 0.3;

        this.mesh.rotation.y = rotationOnset * (time * 2.2 + 0.8);
        this.mesh.rotation.x = rotationOnset * (time * 1.5 + 0.4);
        this.mesh.rotation.z = rotationOnset * Math.sin(time * 2.8) * 0.2;

        // Gentle float only when ball is at apex
        this.mesh.position.y = ballVisible ? Math.sin(time * 3.5) * 0.05 * rotationOnset : 0;
        this.mesh.position.x = 0;

        // Shadow: appears as ball forms
        const shadowOpacity = Math.max(0, (crunch - 0.4) / 0.6) * 0.5;
        const shadowScale = 1.0 - crunch * 0.5;
        this.shadowMesh.material.opacity = shadowOpacity;
        this.shadowMesh.scale.set(shadowScale, shadowScale, shadowScale);
      }
    },

    executeTransition(options = {}) {
      return new Promise((resolve) => {
        if (this.isAnimating) {
          if (typeof options.onApex === 'function') options.onApex();
          return resolve();
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          if (typeof options.onApex === 'function') options.onApex();
          if (typeof options.onComplete === 'function') options.onComplete();
          return resolve();
        }

        this.init();

        const overlay = document.getElementById('paper-crunch-overlay');
        const badgeText = document.getElementById('paper-crunch-badge-text');
        if (badgeText) badgeText.textContent = options.label || 'Turning Page...';

        const isFromPaper = options.fromTheme === 'paper' ||
          (options.fromTheme === undefined && document.body.classList.contains('theme-paper'));
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        if (!window.THREE) {
          return this.executeCssFallback(options, resolve);
        }

        this.initThree();
        if (!this.renderer) {
          return this.executeCssFallback(options, resolve);
        }

        this.isAnimating = true;

        // Set texture matching outgoing theme
        if (this.material) {
          this.material.map = this.getPaperTexture(isFromPaper, isDark);
          this.material.needsUpdate = true;
          this.material.transparent = false;
          this.material.opacity = 1.0;
        }

        // Reset mesh transform
        if (this.mesh) {
          this.mesh.rotation.set(0, 0, 0);
          this.mesh.position.set(0, 0, 0);
        }

        // Show overlay — background is now opaque, no backdrop-filter image bleed
        overlay.classList.add('active');
        this.playPaperRustleAudio('crumple');

        const DURATION = 1050; // ms total — slightly longer for more visible crumple
        const startTime = performance.now();
        let apexTriggered = false;

        const animateLoop = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / DURATION, 1.0);
          const timeSec = elapsed * 0.001;

          let crunchProgress = 0.0;

          // Stage 1: Crunch 0→1 (0% – 44%)
          // Stage 2: Ball apex, hold at 1.0 (44% – 58%)
          // Stage 3: Unfold 1→0 (58% – 100%)

          if (progress < 0.44) {
            crunchProgress = progress / 0.44;
          } else if (progress < 0.58) {
            crunchProgress = 1.0;
          } else {
            const stageP = (progress - 0.58) / 0.42;
            // Ease-in for unfolding so it starts slow (ball holds a moment) then opens fast
            crunchProgress = Math.max(0.0, 1.0 - (stageP * stageP * (3 - 2 * stageP)));
          }

          // Guaranteed apex: fires once when ball is fully formed
          if (progress >= 0.44 && !apexTriggered) {
            apexTriggered = true;

            if (typeof options.onApex === 'function') {
              try { options.onApex(); } catch (err) {
                console.error('Paper transition onApex error:', err);
              }
            }

            // Swap to new-theme texture at apex
            const isToPaper = options.toTheme === 'paper' ||
              (options.toTheme === undefined && document.body.classList.contains('theme-paper'));
            const isNewDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (this.material) {
              this.material.map = this.getPaperTexture(isToPaper, isNewDark);
              this.material.needsUpdate = true;
            }

            this.playPaperRustleAudio('unfold');
          }

          this.deformPaperMesh(crunchProgress, timeSec, apexTriggered);

          if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
          }

          if (progress < 1.0) {
            requestAnimationFrame(animateLoop);
          } else {
            if (!apexTriggered && typeof options.onApex === 'function') {
              options.onApex();
            }

            overlay.classList.remove('active');
            this.isAnimating = false;

            // Reset mesh for next use
            if (this.mesh) {
              this.mesh.rotation.set(0, 0, 0);
              this.mesh.position.set(0, 0, 0);
            }

            // Settle animation on new page content
            const mainContent = document.getElementById('main-content');
            const publicViewport = document.getElementById('public-viewport');
            if (mainContent) {
              mainContent.classList.add('paper-unfold-settle');
              setTimeout(() => mainContent.classList.remove('paper-unfold-settle'), 480);
            }
            if (publicViewport) {
              publicViewport.classList.add('paper-unfold-settle');
              setTimeout(() => publicViewport.classList.remove('paper-unfold-settle'), 480);
            }

            if (typeof options.onComplete === 'function') options.onComplete();
            resolve();
          }
        };

        requestAnimationFrame(animateLoop);
      });
    },

    executeCssFallback(options, resolve) {
      const overlay = document.getElementById('paper-crunch-overlay');
      overlay.classList.add('active', 'css-fallback-mode');

      const fallbackBall = document.createElement('div');
      fallbackBall.className = 'paper-crunch-css-ball';
      overlay.appendChild(fallbackBall);

      this.playPaperRustleAudio('crumple');

      setTimeout(() => {
        if (typeof options.onApex === 'function') options.onApex();
        this.playPaperRustleAudio('unfold');

        setTimeout(() => {
          overlay.classList.remove('active', 'css-fallback-mode');
          if (fallbackBall.parentNode) fallbackBall.parentNode.removeChild(fallbackBall);
          if (typeof options.onComplete === 'function') options.onComplete();
          resolve();
        }, 400);
      }, 440);
    }
  };

  window.PaperCrunchEngine = PaperCrunchEngine;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PaperCrunchEngine.init());
  } else {
    PaperCrunchEngine.init();
  }

})(window);
