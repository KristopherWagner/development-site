import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// styling an h4 to look like an h5 for accessibility reasons
const Heading = styled.h4`
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.3;
  margin: calc(2* 1.3 * 16px) auto calc(1.3 * 16px);

  @media (min-width: 1080px) {
    font-size: 1.5rem;
    margin: calc(2* 1.3 * 1rem) auto calc(1.3 * 1rem);
  }
`;

export default function Question({ children }) {
  return (
    <Heading><em>{children}</em></Heading>
  );
}

Question.propTypes = {
  children: PropTypes.node.isRequired,
};
