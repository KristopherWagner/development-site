/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import useProgressiveImage from './useProgressiveImage';

import { desktopParallax, mobileParallax } from './Parallax.module.css';

export default function Parallax({
  aspectRatio,
  mobile = false,
  url,
  ...rest
}: {
  aspectRatio: string;
  mobile?: boolean;
  url: string;
}) {
  const imgSrc = useProgressiveImage(url);

  const className = mobile ? mobileParallax : desktopParallax;

  console.log(className);

  return (
    <div
      className={className}
      style={{
        aspectRatio,
        backgroundImage: `url(${imgSrc || ''})`,
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  );
}
