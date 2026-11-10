/**
 * Pathfolio Paper World — Procedural Canvas Texture & Material for Paper Mesh
 */

export const createPaperCanvasTexture = (isPaperTheme = true, isDark = false) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (isPaperTheme) {
    ctx.fillStyle = isDark ? '#22262E' : '#FFFEFA';
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(23, 23, 23, 0.08)';
    ctx.lineWidth = 1.5;
    for (let x = 0; x <= 1024; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    ctx.strokeStyle = isDark ? '#F4F1EA' : '#171717';
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 24, 976, 976);
  } else {
    ctx.fillStyle = isDark ? '#151D30' : '#FFFFFF';
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = '#6366F1';
    ctx.fillRect(0, 0, 1024, 10);

    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 944, 944);
  }

  // Add micro paper fibers & grain
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * (isDark ? 16 : 14);
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  return canvas;
};

