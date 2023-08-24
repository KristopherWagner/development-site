import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledGrid = styled.div`
  @media (min-width: 1080px) {
    display: grid;
    grid-template-columns: ${(props) => (
    props.columns === 3 ? '1fr 1fr 1fr' : '1fr 1fr')};
  }
`;

const GridItem = styled.div`
  padding: 8px;
  margin: 8px;
`;
export { GridItem };

export default function Grid(props) {
  const { children, columns } = props;
  return <StyledGrid columns={columns}>{children}</StyledGrid>;
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOf([2, 3]),
};

Grid.defaultProps = {
  columns: 3,
};
