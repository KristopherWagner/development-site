import React from 'react';

import Question from './Question';

export default function Tickets() {
  return (
    <>
      <Question>
        Do I need a theme park ticket for any of the events?
      </Question>
      <p className="body1">
        You do not need a theme park ticket to attend the rehearsal dinner, ceremony, or reception.
        If you choose to celebrate with us on Sunday at EPCOT, you will need to purchase a ticket
        to enter the park.
      </p>
    </>
  );
}
