import Link from '../Link';

import styles from './Activities.module.css';

export default function Activities() {
  return (
    <>
      <h4>Things to do</h4>
      <p className="body1">
        Here are a few of our favorite things to do while at Walt Disney World;
        you can also reach out to us directly for any recommendations!
      </p>
      <h5 className="montserrat">
        <i className="fa-duotone fa-pizza-slice" />
        {' Eat'}
      </h5>
      <ul className={styles.list}>
        <b>EPCOT</b>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/epcot/teppan-edo/"
            text="Teppan Edo"
          />
        </li>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/events-tours/epcot/epcot-international-flower-and-garden-festival/"
            text="International Flower & Garden Festival"
          />
        </li>
      </ul>
      <ul className={styles.list}>
        <b>Disney&apos;s Animal Kingdom</b>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/animal-kingdom/satuli-canteen/"
            text="Satu'li Canteen"
          />
        </li>
      </ul>
      <ul className={styles.list}>
        <li className="body2">
          <b>Disney&apos;s Hollywood Studios</b>
        </li>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/hollywood-studios/docking-bay-7-food-and-cargo/"
            text="Docking Bay 7"
          />
        </li>
      </ul>
      <ul className={styles.list}>
        <b>Disney Springs</b>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/disney-springs/city-works/"
            text="City Works Eatery & Pour House"
          />
        </li>
      </ul>
      <ul className={styles.list}>
        <b>Disney&apos;s Wilderness Lodge</b>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/wilderness-lodge-resort/whispering-canyon-cafe/"
            text="Whispering Canyon Cafe"
          />
        </li>
      </ul>
      <h5 className="montserrat">
        <i className="fa-duotone fa-beer-mug" />
        {' Drink'}
      </h5>
      <ul className={styles.list}>
        <b>Disney&apos;s Boardwalk</b>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/entertainment/boardwalk/jellyrolls/"
            text="Jellyrolls"
          />
        </li>
      </ul>
      <ul className={styles.list}>
        <b>Disney&apos;s Polynesian Village Resort</b>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/polynesian-resort/trader-sams-grog-grotto/"
            text="Trader Sam's Grog Grotto"
          />
        </li>
      </ul>
      <ul className={styles.list}>
        <b>Disney Springs</b>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/disney-springs/jock-lindseys-hangar-bar/"
            text="Jock Lindsey's Hangar Bar"
          />
        </li>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/disney-springs/city-works/"
            text="City Works Eatery & Pour House"
          />
        </li>
      </ul>
      <ul className={styles.list}>
        <b>Disney&apos;s Hollywood Studios</b>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/hollywood-studios/ogas-cantina/"
            text="Oga's Cantina"
          />
        </li>
      </ul>
      <ul className={styles.list}>
        <b>EPCOT</b>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/events-tours/epcot/epcot-international-flower-and-garden-festival/"
            text="International Flower & Garden Festival"
          />
        </li>
      </ul>
      <h5 className="montserrat">
        <i className="fa-duotone fa-roller-coaster" />
        {' Play'}
      </h5>
      <ul className={styles.list}>
        <li className="body1">EPCOT</li>
        <li className="body1">Magic Kingdom</li>
        <li className="body1">Disney&apos;s Hollywood Studios</li>
        <li className="body1">Disney&apos;s Animal Kingdom</li>
        <li className="body1">Disney&apos;s Typhoon Lagoon Water Park</li>
        <li className="body1">Disney Springs</li>
      </ul>
    </>
  );
}
