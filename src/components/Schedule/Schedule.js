import React from 'react';

import { PRIMARY_CONTAINER_TEXT } from '../Colors';
import HorizontalRule from '../HorizontalRule';
import ScheduleItem from './ScheduleItem';

export default function Schedule() {
  return (
    <>
      <h3>Schedule of Events</h3>
      <HorizontalRule color={PRIMARY_CONTAINER_TEXT} />
      <h4 className="Montserray">Thursday</h4>
      <ScheduleItem
        dress="Smart casual"
        name="Rehearsal Dinner"
        when="7:00pm - 9:00pm"
        where="Fantasmic! Disney's Hollywood Studios"
        who="All guests (optional)"
        note={(
          <strong>Please meet at the entrance to Disney&apos;s Hollywood Studios at 6:30pm</strong>
        )}
      />
      <HorizontalRule color={PRIMARY_CONTAINER_TEXT} />
      <h4 className="Montserray">Friday</h4>
      <ScheduleItem
        dress="Cocktail attire"
        name="Ceremony"
        when="7:30pm - 8:00pm"
        where="Disney's Wedding Pavilion"
        who="All adult guests"
      />
      <ScheduleItem
        dress="Cocktail attire"
        name="Reception"
        when="8:30pm - 1:30am"
        where="Italy Isola, EPCOT"
        who="All adult guests"
      />
      <HorizontalRule color={PRIMARY_CONTAINER_TEXT} />
      <h4 className="Montserray">Sunday</h4>
      <ScheduleItem
        name="Park day"
        when="11:00am"
        where="EPCOT"
        who="All guests (optional)"
      />
    </>
  );
}
