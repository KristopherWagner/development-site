import React from 'react';
import styled from 'styled-components';

import Link from '../Link';

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

// eslint-disable-next-line react/prop-types
function BodyLI({ className, children }) {
  return <li className={`${className} body1`}>{children}</li>;
}

const Bold = styled(BodyLI)`
    font-weight: bold;
    margin: 0 auto;
`;

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
      <List>
        <Bold>EPCOT</Bold>
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
      </List>
      <List>
        <Bold>Disney&apos;s Animal Kingdom</Bold>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/animal-kingdom/satuli-canteen/"
            text="Satu'li Canteen"
          />
        </li>
      </List>
      <List>
        <Bold>Disney&apos;s Hollywood Studios</Bold>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/hollywood-studios/docking-bay-7-food-and-cargo/"
            text="Docking Bay 7"
          />
        </li>
      </List>
      <List>
        <Bold>Disney Springs</Bold>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/disney-springs/city-works/"
            text="City Works Eatery & Pour House"
          />
        </li>
      </List>
      <List>
        <Bold>Disney&apos;s Wilderness Lodge</Bold>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/wilderness-lodge-resort/whispering-canyon-cafe/"
            text="Whispering Canyon Cafe"
          />
        </li>
      </List>
      <h5 className="montserrat">
        <i className="fa-duotone fa-beer-mug" />
        {' Drink'}
      </h5>
      <List>
        <Bold>Disney&apos;s Boardwalk</Bold>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/entertainment/boardwalk/jellyrolls/"
            text="Jellyrolls"
          />
        </li>
      </List>
      <List>
        <Bold>Disney&apos;s Polynesian Village Resort</Bold>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/polynesian-resort/trader-sams-grog-grotto/"
            text="Trader Sam's Grog Grotto"
          />
        </li>
      </List>
      <List>
        <Bold>Disney Springs</Bold>
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
      </List>
      <List>
        <Bold>Disney&apos;s Hollywood Studios</Bold>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/dining/hollywood-studios/ogas-cantina/"
            text="Oga's Cantina"
          />
        </li>
      </List>
      <List>
        <Bold>EPCOT</Bold>
        <li className="body2">
          <Link
            href="https://disneyworld.disney.go.com/events-tours/epcot/epcot-international-flower-and-garden-festival/"
            text="International Flower & Garden Festival"
          />
        </li>
      </List>
      <h5 className="montserrat">
        <i className="fa-duotone fa-roller-coaster" />
        {' Play'}
      </h5>
      <List>
        <li className="body1">EPCOT</li>
        <li className="body1">Magic Kingdom</li>
        <li className="body1">Disney&apos;s Hollywood Studios</li>
        <li className="body1">Disney&apos;s Animal Kingdom</li>
        <li className="body1">Disney&apos;s Typhoon Lagoon Water Park</li>
        <li className="body1">Disney Springs</li>
      </List>
    </>
  );
}
