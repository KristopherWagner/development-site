import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PRIMARY } from './Colors';

const StyledHorizontalRule = styled.div`
  border: 1px solid ${(props) => props.color};
  margin: 16px auto;
  width: 75%;
`;

export default function HorizontalRule(props) {
  const { color } = props;
  return <StyledHorizontalRule color={color} />;
}

HorizontalRule.propTypes = {
  color: PropTypes.string,
};

HorizontalRule.defaultProps = {
  color: PRIMARY,
};
