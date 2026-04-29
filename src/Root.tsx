import React from 'react';
import {Composition} from 'remotion';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadCooper} from '@remotion/google-fonts/CooperHewitt';
import {BarterBreakdown} from './scenes/BarterBreakdown';

loadInter('normal', {weights: ['100', '700']});
loadCooper('normal', {weights: ['700']});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BarterBreakdown"
        component={BarterBreakdown}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={480}
      />
      <Composition
        id="BarterBreakdownHorizontal"
        component={BarterBreakdown}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={480}
      />
    </>
  );
};
