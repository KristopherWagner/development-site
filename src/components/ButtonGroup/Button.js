import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PRIMARY_CONTAINER_TEXT, SECONDARY_CONTAINER } from '../Colors';

const StyledButton = styled.button`
  border-radius: 20px;
  border: 1px solid;
  background-color: ${(props) => (props.selected ? SECONDARY_CONTAINER : 'transparent')};
  color: ${PRIMARY_CONTAINER_TEXT};
  height: 50px;

  &:hover {
    background-color: ${SECONDARY_CONTAINER};
  }
`;

export default function Button(props) {
  const { children, onClick, selected } = props;
  return (
    <StyledButton
      className="button"
      onClick={onClick}
      selected={selected}
      type="button"
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Button.defaultProps = {
  selected: false,
};
