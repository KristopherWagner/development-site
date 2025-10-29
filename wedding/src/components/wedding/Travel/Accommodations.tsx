import Link from '../Link';

export default function Accommodations() {
  return (
    <>
      <h4>Accommodations</h4>
      <p className="body1">
        While we will be staying at the Grand Floridian Resort and Villas for
        the length of our stay, you have a multitude of options across the Walt
        Disney World Resort as well as off-property options. For ease of
        transportation, we recommend staying at one of the{' '}
        <Link
          href="https://disneyworld.disney.go.com/faq/resorts/resort-hotel-list/"
          text="31 resort options"
        />
        {' within the Walt Disney World Resort.'}
      </p>
      <h5>Book directly through WDW</h5>
      <p className="subtitle1">
        <Link
          href="https://disneyworld.disney.go.com/resorts/"
          text="This option"
        />{' '}
        allows you to review all 31 resort options available and book directly.
        Prices may fluctuate depending on seasonality and sales
      </p>
      <h5>Purchase DVC rental points</h5>
      <p className="body1">
        We recommend{' '}
        <Link
          href="https://dvcrequest.com/"
          text="David's Vacation Club Rentals"
        />{' '}
        to access 12 Walt Disney World resorts at a lower cost than booking
        directly through Walt Disney World. This method requires both
        availability and someone willing to sell their points.
      </p>
      <h5>Book using a Travel Agent</h5>
      <p className="body1">
        This method is a free service that handles all of your vacation planning
        in one spot (hotel, park tickets, dining reservations, etc.) for an
        easy, hands-off booking process.
      </p>
    </>
  );
}
