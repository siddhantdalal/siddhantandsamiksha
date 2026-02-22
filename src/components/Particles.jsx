import { useState, useEffect, memo } from 'react';
import ReactParticles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function Particles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <ReactParticles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: 1 },
        fpsLimit: 60,
        particles: {
          number: { value: 30, density: { enable: true, area: 1200 } },
          color: { value: ['#c9a96e', '#d4ba85', '#e8c4c4'] },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.1, max: 0.4 },
            animation: { enable: true, speed: 0.5, minimumValue: 0.05 },
          },
          size: {
            value: { min: 1, max: 3 },
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
            particles: { enable: true, frequency: 0.03, color: '#c9a96e', opacity: 0.6 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default memo(Particles);
