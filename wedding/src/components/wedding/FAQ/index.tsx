import HorizontalRule from '../HorizontalRule';

import Children from './Children';
import Hotel from './Hotel';
import Phones from './Phones';
import Registry from './Registry';
import Tickets from './Tickets';

export default function FAQ() {
  return (
    <>
      <h3>Frequently Asked Questions</h3>
      <HorizontalRule variant="backgroundLightText" />
      <Children />
      <Phones />
      <Hotel />
      <Tickets />
      <Registry />
    </>
  );
}
