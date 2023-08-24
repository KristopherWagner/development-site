import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButtonGroup = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, 130px);
  justify-content: center;
  margin: auto;
  width: 75%;
`;

export default function ButtonGroup(props) {
  const { children } = props;
  return <StyledButtonGroup>{children}</StyledButtonGroup>;
}

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
