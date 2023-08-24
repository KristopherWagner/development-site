import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PRIMARY_CONTAINER, PRIMARY_CONTAINER_TEXT } from '../Colors';

const Root = styled.div`
  align-self: center;
  background-color: transparent;
  display: inline-block;
  justify-self: center;
  margin-top: 16px;
  perspective: 1000px;

  height: 300px;
  width: 300px;
`;

const Container = styled.div`
  box-shadow: 0 3px 6px black;
  position: relative;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  height: 100%;
  width: 100%;

  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'none')};
`;

const Front = styled.div`
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
  z-index: 1;

  height: 100%;
  width: 100%;
`;

const Back = styled(Front)`
  background-color: ${PRIMARY_CONTAINER};
  color: ${PRIMARY_CONTAINER_TEXT};
  transform: rotateY(180deg);
`;

const Padding = styled.div`
  padding: 16px 8px;
`;

export default function FlipCard(props) {
  const { image, memory, name } = props;
  const [flipped, setFlipped] = useState(false);

  return (
    <Root
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <Container
        flipped={flipped}
        onClick={() => setFlipped(!flipped)}
      >
        <Front>
          {image}
        </Front>
        <Back>
          <Padding>
            <h4 className="montserrat">{name}</h4>
            <p className="body1">{memory}</p>
          </Padding>
        </Back>
      </Container>
    </Root>
  );
}

FlipCard.propTypes = {
  image: PropTypes.node.isRequired,
  memory: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
