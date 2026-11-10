/**
 * Pathfolio Paper World — Procedural 3D Paper Deformation Mathematics
 * Calculates dynamic vertex positions for crumpling a flat plane into an irregular 3D paper ball,
 * and unfolding back into flat sheet.
 */

export const generateCreaseNoiseMap = (gridW = 52, gridH = 52) => {
  const total = (gridW + 1) * (gridH + 1);
  const map = new Float32Array(total);

  for (let i = 0; i < total; i++) {
    const u = (i % (gridW + 1)) / gridW;
    const v = Math.floor(i / (gridW + 1)) / gridH;

    const cx = (u - 0.5) * 2;
    const cy = (v - 0.5) * 2;
    const dist = Math.sqrt(cx * cx + cy * cy);
    const angle = Math.atan2(cy, cx);

    const fold1 = Math.abs(Math.sin(cx * 5.4 + cy * 3.7));
    const fold2 = Math.abs(Math.cos(cx * 4.1 - cy * 6.3 + 0.8));
    const fold3 = Math.abs(Math.sin(angle * 4.0 + dist * 7.0));
    const fold4 = Math.abs(Math.cos(cx * 11.0 + cy * 9.0));

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

    map[i] = 0.4 * (1.0 - 2.0 * fold1) +
             0.3 * (1.0 - 2.0 * fold2) +
             0.2 * (fold3 - 0.5) +
             0.1 * (fold4 - 0.5) +
             pinch;
  }
  return map;
};

export const calculateDeformedPositions = (
  originalPositions,
  targetArray,
  creases,
  crunchFactor,
  time,
  planeW = 4.2,
  planeH = 2.7,
  ballRadius = 0.95
) => {
  const count = originalPositions.length / 3;
  const c = crunchFactor * crunchFactor * (3 - 2 * crunchFactor);
  const twistAngle = c * 2.8;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x0 = originalPositions[i3];
    const y0 = originalPositions[i3 + 1];
    const z0 = originalPositions[i3 + 2];

    const u = x0 / (planeW * 0.5);
    const v = y0 / (planeH * 0.5);
    const dist = Math.sqrt(u * u + v * v);

    const cornerFactor = Math.pow(Math.min(dist / 1.3, 1.0), 2.2);
    const curlZ = (1.0 - c) * cornerFactor * Math.sin(c * Math.PI) * 0.8;

    const sphereLat = (v * 0.5) * Math.PI;
    const sphereLon = (u * 0.9) * Math.PI + (dist * twistAngle * 0.5);

    const cosLat = Math.cos(sphereLat);
    const sx = ballRadius * cosLat * Math.sin(sphereLon);
    const sy = ballRadius * Math.sin(sphereLat);
    const sz = ballRadius * cosLat * Math.cos(sphereLon);

    const creaseVal = creases[i] || 0;
    const crumpleAmp = c * 0.38;
    const dispRadial = 1.0 + (creaseVal * crumpleAmp);

    const targetX = sx * dispRadial;
    const targetY = sy * dispRadial;
    const targetZ = sz * dispRadial;

    targetArray[i3] = (1.0 - c) * x0 + c * targetX;
    targetArray[i3 + 1] = (1.0 - c) * y0 + c * targetY;
    targetArray[i3 + 2] = (1.0 - c) * (z0 + curlZ) + c * targetZ;
  }
};

