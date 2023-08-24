import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Heading = styled.h5`
  font-family: "Montserrat", serif;
  text-decoration: underline;
`;

export default function ScheduleItem(props) {
  const {
    dress, name, note, when, where, who,
  } = props;

  return (
    <>
      <Heading>{name}</Heading>
      <p className="body1">
        {who && `Who: ${who}`}
        {who && <br />}
        {when && `When: ${when}`}
        {when && <br />}
        {where && `Where: ${where}`}
        {where && <br />}
        {dress && `Dress: ${dress}`}
        {note && <br />}
        {note}
      </p>
    </>
  );
}

ScheduleItem.propTypes = {
  dress: PropTypes.string,
  name: PropTypes.string.isRequired,
  note: PropTypes.string,
  when: PropTypes.string,
  where: PropTypes.string,
  who: PropTypes.string,
};

ScheduleItem.defaultProps = {
  dress: undefined,
  note: undefined,
  when: undefined,
  where: undefined,
  who: undefined,
};
