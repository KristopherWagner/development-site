import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  BACKGROUND_LIGHT, BACKGROUND_LIGHT_TEXT,
  PRIMARY_CONTAINER, PRIMARY_CONTAINER_TEXT,
  SECONDARY_CONTAINER, SECONDARY_CONTAINER_TEXT,
} from './Colors';

const Root = styled.div`
    padding: 24px;
    text-align: center;
`;

const Light = styled(Root)`
    background-color: ${BACKGROUND_LIGHT};
    color: ${BACKGROUND_LIGHT_TEXT};
`;

const Primary = styled(Root)`
    background-color: ${PRIMARY_CONTAINER};
    color: ${PRIMARY_CONTAINER_TEXT};
`;

const Secondary = styled(Root)`
    background-color: ${SECONDARY_CONTAINER};
    color: ${SECONDARY_CONTAINER_TEXT};
`;

export default function Section(props) {
  const { anchor, children, variant } = props;

  let Component;

  switch (variant) {
    case 'light':
      Component = Light;
      break;
    case 'primary':
      Component = Primary;
      break;
    case 'secondary':
      Component = Secondary;
      break;
    default:
      Component = Root;
  }

  return (
    <section>
      <Component id={anchor}>
        {children}
      </Component>
    </section>
  );
}

Section.propTypes = {
  anchor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['light', 'primary', 'secondary']),
};

Section.defaultProps = {
  variant: 'primary',
};
