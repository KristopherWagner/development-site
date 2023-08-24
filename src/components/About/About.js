/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { SECONDARY_CONTAINER_TEXT } from '../Colors';
import FlipCard from './FlipCard';
import HorizontalRule from '../HorizontalRule';

const SHARED_PROPS = {
  loading: 'lazy',
  height: 300,
  widht: 300,
};

const Casper = <StaticImage alt="Casper" src="../../images/Casper.webp" {...SHARED_PROPS} />;
const Ella = <StaticImage alt="Ella" src="../../images/Ella.webp" {...SHARED_PROPS} />;
const Jeb = <StaticImage alt="Jeb" src="../../images/Jeb.webp" {...SHARED_PROPS} />;
const Jeremy = <StaticImage alt="Jeremy" src="../../images/Jeremy.webp" {...SHARED_PROPS} />;
const Jesse = <StaticImage alt="Jesse" src="../../images/Jesse.webp" {...SHARED_PROPS} />;
const Jordan = <StaticImage alt="Jordan" src="../../images/Jordan.webp" {...SHARED_PROPS} />;
const Kelly = <StaticImage alt="Kelly" src="../../images/Kelly.webp" {...SHARED_PROPS} />;
const Kristopher = <StaticImage alt="Kristopher" src="../../images/Kristopher.webp" {...SHARED_PROPS} />;
const Nick = <StaticImage alt="Nick" src="../../images/Nick.webp" {...SHARED_PROPS} />;
const Shannon = <StaticImage alt="Shannon" src="../../images/Shannon.webp" {...SHARED_PROPS} />;
const Sarah = <StaticImage alt="Sarah" src="../../images/Sarah.webp" {...SHARED_PROPS} />;
const Will = <StaticImage alt="Will" src="../../images/Will.webp" {...SHARED_PROPS} />;

const BrideAndGroomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 616px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 948px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
 
  @media (min-width: 1256px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1564px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

export default function About() {
  return (
    <>
      <h3 className="montserrat">The Wedding Party</h3>
      <h4>Bride and Groom</h4>
      <HorizontalRule color={SECONDARY_CONTAINER_TEXT} />
      <BrideAndGroomContainer>
        <FlipCard
          image={Shannon}
          memory="Going on a nighttime safari with Kristopher for my birthday"
          name="Shannon Swanson"
        />
        <FlipCard
          image={Kristopher}
          memory="Experiencing the Star Wars Galactic Starcruiser with Shannon"
          name="Kristopher Wagner"
        />
      </BrideAndGroomContainer>
      <h4>Attendants</h4>
      <p className="subtitle1">Meet the attendants for our wedding and learn their favorite Disney memory</p>
      <HorizontalRule color={SECONDARY_CONTAINER_TEXT} />
      <CardContainer>
        <FlipCard
          image={Ella}
          memory="Seeing Cinderella Castle from the ferry boat for the first time"
          name="Ella Melzer"
        />
        <FlipCard
          image={Jesse}
          memory="Riding the Kilimanjaro Safari with my wife"
          name="Jesse Sharkawy"
        />
        <FlipCard
          image={Sarah}
          memory="Watching Fourth of July Fireworks from Liberty Square"
          name="Sarah Melzer"
        />
        <FlipCard
          image={Nick}
          memory="Waking up every morning at the Animal Kingdom Lodge and seeing the animals walk outside my room"
          name="Nicholas Stuter"
        />
        <FlipCard
          image={Jordan}
          memory="Spending an entire day meeting characters and collecting signatures for my grad cap"
          name="Jordan Barrett"
        />
        <FlipCard
          image={Will}
          memory="Staying at Disney with Jordan for the first time"
          name="Will Swanson"
        />
        <FlipCard
          image={Kelly}
          memory="Feeling like I'm flying on the Avatar Flight of Passage ride in Pandora"
          name="Kelly Swanson-Obando"
        />
        <FlipCard
          image={Jeb}
          memory="Exploring the halloween party with my siblings and eating all the desserts"
          name="Jeb Wagner"
        />
        <FlipCard
          image={Casper}
          memory="Spending the night in Cinderella Castle and being a part of the parade during the year of a million dreams"
          name="Casper Wagner"
        />
        <FlipCard
          image={Jeremy}
          memory="Accidentally cutting to the front of the line for Donald Duck"
          name="Jeremy Charles"
        />
      </CardContainer>
    </>
  );
}
