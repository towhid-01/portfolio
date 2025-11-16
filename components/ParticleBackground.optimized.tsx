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

    // Optimized Particle class - Reduced glow for better performance
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
        this.size = isEmoji ? (22 + Math.random() * 10) : (14 + Math.random() * 6);
        this.opacity = 0.4 + Math.random() * 0.2;
        this.drift = (Math.random() - 0.5) * 0.5;

        // Brighter gaming colors
        const colors = [
          'rgba(251, 146, 60, ',  // brighter orange
          'rgba(34, 211, 238, ',  // brighter cyan
          'rgba(168, 85, 247, ',  // brighter purple
          'rgba(229, 231, 235, ', // brighter gray for code
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        // PERFORMANCE: Reduced glow intensity from 15-35 to 8-16 for better performance
        this.glowIntensity = 8 + Math.random() * 8;
        this.rotationSpeed = isEmoji ? ((Math.random() - 0.5) * 0.015) : 0;
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

        // PERFORMANCE: Optimized glow effect - Reduced shadow opacity for performance
        ctx.shadowBlur = this.glowIntensity;
        ctx.shadowColor = this.color + '0.5)'; // Reduced from 0.8

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

    // PERFORMANCE: Reduced particle count from 20/30 to 10/15 for buttery smooth performance
    const particleCount = window.innerWidth < 768 ? 10 : 15;
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    // PERFORMANCE: Static gradient (created once, not recreated every frame)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(147, 51, 234, 0.03)');
    gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.03)');

    // Optimized animation loop - Removed grid/hexagons for performance
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // PERFORMANCE: Only draw simple static gradient (removed grid, hexagons, animated gradient)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
