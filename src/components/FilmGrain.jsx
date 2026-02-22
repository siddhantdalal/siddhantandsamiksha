import { memo } from 'react';

const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 9999,
  opacity: 0.02,
  background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundSize: '256px 256px',
  animation: 'grain 8s steps(4) infinite',
};

function FilmGrain() {
  return (
    <>
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-2%, -1%); }
          50% { transform: translate(1%, 2%); }
          75% { transform: translate(-1%, -2%); }
        }
      `}</style>
      <div style={style} aria-hidden="true" />
    </>
  );
}

export default memo(FilmGrain);
