import Link from '../Link';

import Question from './Question';

export default function Hotel() {
  return (
    <>
      <Question>Do I need to stay at a Disney-owned hotel?</Question>
      <p className="body1">
        {'No, but there are '}
        <Link
          href="https://disneyworld.disney.go.com/resort-hotels-benefits/"
          text="benefits of staying at a Disney Resort Hotel"
        />
        {' including '}
        <Link
          href="https://disneyworld.disney.go.com/special-offers/early-2023-package-offer/"
          text="discounts on park tickets"
        />
        . In the &quot;Accommodations&quot; section we recommend staying at a
        Disney hotel. If you read that section and need more help, feel free to{' '}
        <Link href="mailto:kmwagner91@gmail.com" text="email the groom" />
        {' for assistance.'}
      </p>
    </>
  );
}
