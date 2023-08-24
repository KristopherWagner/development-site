/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import { useProgressiveImage } from '../hooks';

const ParallaxDiv = styled.div`
    aspect-ratio: ${(props) => props.aspectRatio};
    background-image: ${(props) => `url(${props.src || ''})`};
    background-repeat: no-repeat;
`;

const DesktopVersion = styled(ParallaxDiv)`
    @media (min-width: 1080px) {
      background-attachment: fixed;
      background-position: center center;
      background-size: cover;
      min-height: 100vh;
    }

    @media (max-width: 1079px) {
      display: none;
    }
`;

const MobileVersion = styled(ParallaxDiv)`
    background-attachment: scroll;
    background-position-y: 0;
    background-size: contain;
    width: 100vw;

    @media (min-width: 1080px) {
      display: none;
    }
`;

export default function Parallax({ mobile, url, ...rest }) {
  const imgSrc = useProgressiveImage(url);
  return !mobile ? (
    <DesktopVersion src={imgSrc} {...rest} />
  ) : (
    <MobileVersion src={imgSrc} {...rest} />
  );
}

Parallax.propTypes = {
  aspectRatio: propTypes.string.isRequired,
  mobile: propTypes.bool,
  url: propTypes.string.isRequired,
};

Parallax.defaultProps = {
  mobile: false,
};
