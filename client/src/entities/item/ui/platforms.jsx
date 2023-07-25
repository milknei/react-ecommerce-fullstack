import { React } from 'react';
import { FlexBox } from '@shared/index';
import { PlaystationIcon, XboxIcon, PCIcon, AppleIcon, AndroidIcon, NintendoIcon, ConsolesIcon } from '@shared/index';

export const Platforms = ({ platforms, sx = {} }) => {
  let anotherPlatforms = false;

  return (
    <FlexBox sx={{ color: 'text.secondary', ...sx }}>
      {platforms.map((platform) => {
        const name = platform.platform.name;
        const id = platform.platform.id;

        if (name === 'PlayStation') return <PlaystationIcon key={id} />;
        if (name === 'PC') return <PCIcon key={id} />;
        if (name === 'Xbox') return <XboxIcon key={id} />;
        if (name === 'iOS' || name === 'Apple Macintosh' || name === 'Apple II' || name === 'macOS')
          return <AppleIcon key={id} />;
        if (name === 'Android') return <AndroidIcon key={id} />;
        if (name === 'Nintendo') return <NintendoIcon key={id} />;
        if (name === 'PlayStation') return <PlaystationIcon key={id} />;
        anotherPlatforms = true;
      })}
      {anotherPlatforms && <ConsolesIcon />}
    </FlexBox>
  );
};
