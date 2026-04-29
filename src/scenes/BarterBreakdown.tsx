import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const colors = {
  charcoal: '#1A1A1A',
  emerald: '#064E3B',
  white: '#F9F9F9',
  gold: '#D4AF37',
  red: '#E11D48',
};

const ParticleBurst: React.FC<{active: boolean}> = ({active}) => {
  const frame = useCurrentFrame();
  const p = active ? interpolate(frame, [15, 40], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  return (
    <>
      {Array.from({length: 12}).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 12;
        const radius = interpolate(frame, [15, 40], [0, 120], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(50% + ${Math.cos(angle) * radius}px)`,
              top: `calc(32% + ${Math.sin(angle) * radius}px)`,
              width: 8,
              height: 8,
              borderRadius: 999,
              background: colors.white,
              opacity: p,
              transform: `scale(${1 + (1 - p) * 2})`,
            }}
          />
        );
      })}
    </>
  );
};

export const BarterBreakdown: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();

  const bg = frame >= 390 ? interpolateColors(frame, [390, 405], [colors.charcoal, colors.emerald]) : colors.charcoal;
  const bakerY = spring({frame, fps, config: {mass: 3, damping: 11}});
  const bakerSplit = interpolate(frame, [60, 90], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const lineGrow = interpolate(frame, [45, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const tenScale = interpolate(frame, [120, 150], [0, 1.5], {easing: Easing.out(Easing.elastic(1.2)), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const breadColorMix = interpolate(frame, [210, 220], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const wiggle = frame >= 210 && frame <= 240 ? Math.sin(frame) * 20 : 0;

  const wipe = interpolate(frame, [390, 405], [-100, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const coinSpring = spring({frame: frame - 410, fps, config: {damping: 9}});

  return (
    <AbsoluteFill style={{background: bg, color: colors.white, fontFamily: 'Inter, sans-serif', overflow: 'hidden'}}>
      {frame < 405 && <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${colors.charcoal} 0%, ${colors.emerald} 130%)`, opacity: 0.5}} />}

      {frame <= 390 && (
        <>
          <div style={{position: 'absolute', top: '22%', left: '50%', transform: `translate(-50%, ${120 - bakerY * 120}px)`, fontSize: width * 0.11, fontFamily: 'Cooper Hewitt, serif', fontStyle: 'italic', fontWeight: 700}}>BAKER</div>
          <ParticleBurst active={frame >= 15 && frame <= 40} />
          <div style={{position: 'absolute', left: '50%', top: '38%', width: 1, height: 250, background: colors.white, transform: `translateX(-50%) scaleY(${lineGrow})`, transformOrigin: 'top'}} />
          <div style={{position: 'absolute', top: '22%', left: '50%', transform: `translate(${-(bakerSplit * 200)}px,0) rotate(${-15 * bakerSplit}deg)`, clipPath: 'inset(0 50% 0 0) translate(-50%,0)', fontSize: width * 0.11, fontStyle: 'italic', fontWeight: 700}}>BAKER</div>
          <div style={{position: 'absolute', top: '22%', left: '50%', transform: `translate(${bakerSplit * 200}px,0) rotate(${15 * bakerSplit}deg)`, clipPath: 'inset(0 0 0 50%) translate(-50%,0)', fontSize: width * 0.11, fontStyle: 'italic', fontWeight: 700}}>BAKER</div>
          <div style={{position: 'absolute', top: '44%', width: '100%', textAlign: 'center', opacity: interpolate(frame, [75, 120], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), letterSpacing: `${interpolate(frame, [75, 120], [24, 2])}px`, fontWeight: 100, fontSize: width * 0.065}}>HAIRCUT</div>
        </>
      )}

      {frame >= 120 && frame < 300 && (
        <>
          <div style={{position: 'absolute', top: '18%', width: '100%', textAlign: 'center', fontSize: width * 0.2, fontWeight: 700, transform: `scale(${tenScale})`}}>10</div>
          <div style={{position: 'absolute', top: '33%', width: '100%', textAlign: 'center', transform: `translateX(${wiggle}px)`}}>
            {Array.from({length: 10}).map((_, i) => (
              <div
                key={i}
                style={{
                  opacity: interpolate(frame, [150 + i * 5, 170 + i * 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
                  fontSize: width * 0.05,
                  color: interpolateColors(breadColorMix, [0, 1], [colors.gold, colors.red]),
                  marginBottom: 6,
                }}
              >
                BREAD
              </div>
            ))}
          </div>
          {frame >= 240 && <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: width * 0.35, color: colors.red, transform: `scale(${interpolate(frame, [240, 252], [1.2, 1])})`}}>✕</div>}
        </>
      )}

      {frame >= 300 && frame < 390 && (
        <>
          <div style={{position: 'absolute', top: '8%', width: '100%', textAlign: 'center', fontWeight: 700, fontSize: width * 0.1}}>BARTER</div>
          <div style={{position: 'absolute', top: '30%', left: '24%', fontSize: width * 0.12}}>🍞</div>
          <div style={{position: 'absolute', top: '30%', right: '24%', fontSize: width * 0.12}}>✂️</div>
          <div style={{position: 'absolute', top: '35%', left: '50%', transform: 'translateX(-50%)', fontSize: width * 0.08, opacity: interpolate(frame, [330, 345], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>↔</div>
          <div style={{position: 'absolute', top: '62%', left: '30%', width: 150, height: 150, border: '2px solid white', borderRadius: '50%', display: 'grid', placeItems: 'center', transform: `scale(${1 + Math.sin(frame / 6) * 0.04})`}}>Baker</div>
          <div style={{position: 'absolute', top: '62%', right: '30%', width: 150, height: 150, border: '2px solid white', borderRadius: '50%', display: 'grid', placeItems: 'center', transform: `scale(${1 + Math.sin(frame / 6) * 0.04})`}}>Barber</div>
          <div style={{position: 'absolute', top: '82%', width: '100%', textAlign: 'center', opacity: Math.floor((frame - 360) / 15) % 2 === 0 ? 1 : 0.2}}>SAME TIME</div>
        </>
      )}

      {frame >= 390 && <div style={{position: 'absolute', inset: 0, background: colors.emerald, transform: `translateX(${wipe}%)`}} />}
      {frame >= 410 && (
        <>
          <div style={{position: 'absolute', top: '36%', width: '100%', textAlign: 'center', fontSize: width * 0.2, color: colors.gold, transform: `perspective(700px) rotateY(${(1 - coinSpring) * 270}deg) scale(${coinSpring})`}}>$</div>
          <div style={{position: 'absolute', top: '58%', width: '100%', textAlign: 'center', fontWeight: 700, fontSize: width * 0.09}}>CURRENCY</div>
          <div style={{position: 'absolute', top: '56%', left: `${interpolate(frame, [440, 480], [-40, 100])}%`, width: '40%', height: '14%', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))'}} />
        </>
      )}
    </AbsoluteFill>
  );
};
