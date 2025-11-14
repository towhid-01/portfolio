"use client";

import { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gaming-themed particles
    const particleSymbols = [
      '🎮', '⭐', '◆', '◇', '▲', '▼', '{}', '</>',
      '■', '□', '●', '○', '★', '☆', '♦', '◈'
    ];

    // Enhanced Particle class with glow effects
    class Particle {
      x: number;
      y: number;
      speed: number;
      symbol: string;
      size: number;
      opacity: number;
      drift: number;
      color: string;
      glowIntensity: number;
      rotationSpeed: number;
      rotation: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.symbol = '';
        this.size = 0;
        this.opacity = 0;
        this.drift = 0;
        this.color = '';
        this.glowIntensity = 0;
        this.rotationSpeed = 0;
        this.rotation = 0;
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.speed = 0.3 + Math.random() * 0.5;
        this.symbol = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        this.size = 14 + Math.random() * 8;
        this.opacity = 0.2 + Math.random() * 0.3;
        this.drift = (Math.random() - 0.5) * 0.4;

        // Gaming colors: purple, cyan, pink, blue
        const colors = [
          'rgba(147, 51, 234, ', // purple
          'rgba(6, 182, 212, ',   // cyan
          'rgba(236, 72, 153, ',  // pink
          'rgba(59, 130, 246, '   // blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.glowIntensity = 10 + Math.random() * 15;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.rotation = 0;
      }

      update() {
        this.y += this.speed;
        this.x += this.drift;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 50) {
          this.reset();
        }
      }

      draw() {
        ctx.save();

        // Add glow effect
        ctx.shadowBlur = this.glowIntensity;
        ctx.shadowColor = this.color + '0.8)';

        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = this.color + this.opacity + ')';

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillText(this.symbol, 0, 0);

        ctx.restore();
      }
    }

    // Grid background
    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.03)'; // Very subtle purple grid
      ctx.lineWidth = 1;

      const gridSize = 50;

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Hexagon pattern overlay
    const drawHexagons = () => {
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)'; // Subtle cyan hexagons
      ctx.lineWidth = 1;

      const hexSize = 40;
      const hexHeight = hexSize * Math.sqrt(3);

      for (let y = 0; y < canvas.height + hexHeight; y += hexHeight * 0.75) {
        for (let x = 0; x < canvas.width + hexSize * 2; x += hexSize * 1.5) {
          const offsetX = (y / (hexHeight * 0.75)) % 2 === 0 ? 0 : hexSize * 0.75;
          drawHexagon(x + offsetX, y, hexSize);
        }
      }

      ctx.restore();
    };

    const drawHexagon = (x: number, y: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
    };

    // Animated gradient overlay
    const drawGradientOverlay = () => {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Animated gradient with time-based color shift
      const shift = Math.sin(time * 0.001) * 0.2;
      gradient.addColorStop(0, `rgba(147, 51, 234, ${0.05 + shift})`); // purple
      gradient.addColorStop(0.5, `rgba(6, 182, 212, ${0.03 + shift})`); // cyan
      gradient.addColorStop(1, `rgba(59, 130, 246, ${0.05 + shift})`); // blue

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Particle count
    const particleCount = window.innerWidth < 768 ? 15 : 25;
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    // Animation loop
    const animate = () => {
      time++;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background elements
      drawGrid();
      drawHexagons();
      drawGradientOverlay();

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'transparent',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    />
  );
}