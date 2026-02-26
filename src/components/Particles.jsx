import { useState, useEffect, memo } from 'react';
import ReactParticles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function getParticleColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    colors: [
      style.getPropertyValue('--color-particle-1').trim() || '#c9a96e',
      style.getPropertyValue('--color-particle-2').trim() || '#d4ba85',
      style.getPropertyValue('--color-particle-3').trim() || '#e8c4c4',
    ],
    twinkle: style.getPropertyValue('--color-particle-1').trim() || '#c9a96e',
  };
}

function Particles() {
  const [init, setInit] = useState(false);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setColors(getParticleColors());
      setInit(true);
    });
  }, []);

  if (!init || !colors) return null;

  return (
    <ReactParticles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: 1 },
        fpsLimit: 60,
        particles: {
          number: { value: 55, density: { enable: true, area: 1000 } },
          color: { value: colors.colors },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.2, max: 0.6 },
            animation: { enable: true, speed: 0.5, minimumValue: 0.1 },
          },
          size: {
            value: { min: 1, max: 3.5 },
            animation: { enable: true, speed: 1, minimumValue: 0.5 },
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
          },
          twinkle: {
            particles: { enable: true, frequency: 0.05, color: colors.twinkle, opacity: 0.8 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default memo(Particles);
