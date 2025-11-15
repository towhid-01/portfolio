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

    // C# Game Development Functions (60%) + Gaming Emojis (40%)
    const csharpFunctions = [
      'void Start()',
      'void Update()',
      'Instantiate()',
      'Transform',
      'Rigidbody',
      'Collider',
      'Vector3',
      'Quaternion',
      'GameObject',
      'MonoBehaviour',
      'Coroutine',
      'Time.deltaTime',
      'GetComponent',
      'AddForce',
      'Destroy',
    ];

    const gamingEmojis = [
      '🎮', '🕹️', '👾', '🎯', '⚡', '🚀',
      '💻', '🔧', '⭐', '💡', '🎲', '🏆'
    ];

    // Mix 60% code, 40% emojis
    const allParticles = [
      ...csharpFunctions,
      ...csharpFunctions, // Duplicate for 60%
      ...gamingEmojis,
    ];

    // Enhanced Particle class with glow effects and better visibility
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
        this.y = Math.random() * (canvas?.height || 0);
      }

      reset() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = -50;
        this.speed = 0.3 + Math.random() * 0.4;
        this.symbol = allParticles[Math.floor(Math.random() * allParticles.length)];

        // Different sizes for code vs emojis
        const isEmoji = gamingEmojis.includes(this.symbol);
        this.size = isEmoji ? (22 + Math.random() * 10) : (14 + Math.random() * 6); // Emoji: 22-32px, Code: 14-20px (larger)
        this.opacity = 0.4 + Math.random() * 0.2; // 0.4-0.6 opacity (increased visibility)
        this.drift = (Math.random() - 0.5) * 0.5; // Slower drift

        // Brighter gaming colors for better visibility
        const colors = [
          'rgba(251, 146, 60, ',  // brighter orange
          'rgba(34, 211, 238, ',  // brighter cyan
          'rgba(168, 85, 247, ',  // brighter purple
          'rgba(229, 231, 235, ', // brighter gray for code
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.glowIntensity = 15 + Math.random() * 20; // Stronger glow
        this.rotationSpeed = isEmoji ? ((Math.random() - 0.5) * 0.015) : 0; // Only rotate emojis
        this.rotation = 0;
      }

      update() {
        this.y += this.speed;
        this.x += this.drift;
        this.rotation += this.rotationSpeed;

        if (this.y > (canvas?.height || 0) + 50) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;

        ctx.save();

        // Add glow effect
        ctx.shadowBlur = this.glowIntensity;
        ctx.shadowColor = this.color + '0.8)';

        ctx.globalAlpha = this.opacity;

        // Use monospace for code, regular for emojis
        const isEmoji = gamingEmojis.includes(this.symbol);
        ctx.font = isEmoji
          ? `${this.size}px Arial`
          : `${this.size}px 'Courier New', Monaco, monospace`;

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

    // Particle count - More visible particles
    const particleCount = window.innerWidth < 768 ? 20 : 30; // Increased from 15/25 to 20/30
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