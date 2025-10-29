import { imageFolder } from '../../../constants';

import HorizontalRule from '../HorizontalRule';

import FlipCard from './FlipCard';
import styles from './About.module.css';

const SHARED_PROPS = {
  loading: 'lazy',
  height: 300,
  widht: 300,
} as const;

export default function About() {
  return (
    <>
      <h3 className="montserrat">The Wedding Party</h3>
      <h4>Bride and Groom</h4>
      <HorizontalRule variant="secondaryContainerText" />
      <div className={styles.brideAndGroom}>
        <FlipCard
          image={
            <img
              alt="Shannon"
              src={imageFolder + 'Shannon.webp'}
              {...SHARED_PROPS}
            />
          }
          memory="Going on a nighttime safari with Kristopher for my birthday"
          name="Shannon Swanson"
        />
        <FlipCard
          image={
            <img
              alt="Kristopher"
              src={imageFolder + 'Kristopher.webp'}
              {...SHARED_PROPS}
            />
          }
          memory="Experiencing the Star Wars Galactic Starcruiser with Shannon"
          name="Kristopher Wagner"
        />
      </div>
      <h4>Attendants</h4>
      <p className="subtitle1">
        Meet the attendants for our wedding and learn their favorite Disney
        memory
      </p>
      <HorizontalRule variant="secondaryContainerText" />
      <div className={styles.cardContainer}>
        <FlipCard
          image={
            <img alt="Ella" src={imageFolder + 'Ella.webp'} {...SHARED_PROPS} />
          }
          memory="Seeing Cinderella Castle from the ferry boat for the first time"
          name="Ella Melzer"
        />
        <FlipCard
          image={
            <img
              alt="Jesse"
              src={imageFolder + 'Jesse.webp'}
              {...SHARED_PROPS}
            />
          }
          memory="Riding the Kilimanjaro Safari with my wife"
          name="Jesse Sharkawy"
        />
        <FlipCard
          image={
            <img
              alt="Sarah"
              src={imageFolder + 'Sarah.webp'}
              {...SHARED_PROPS}
            />
          }
          memory="Watching Fourth of July Fireworks from Liberty Square"
          name="Sarah Melzer"
        />
        <FlipCard
          image={
            <img alt="Nick" src={imageFolder + 'Nick.webp'} {...SHARED_PROPS} />
          }
          memory="Waking up every morning at the Animal Kingdom Lodge and seeing the animals walk outside my room"
          name="Nicholas Stuter"
        />
        <FlipCard
          image={
            <img
              alt="Jordan"
              src={imageFolder + 'Jordan.webp'}
              {...SHARED_PROPS}
            />
          }
          memory="Spending an entire day meeting characters and collecting signatures for my grad cap"
          name="Jordan Barrett"
        />
        <FlipCard
          image={
            <img alt="Will" src={imageFolder + 'Will.webp'} {...SHARED_PROPS} />
          }
          memory="Staying at Disney with Jordan for the first time"
          name="Will Swanson"
        />
        <FlipCard
          image={
            <img
              alt="Kelly"
              src={imageFolder + 'Kelly.webp'}
              {...SHARED_PROPS}
            />
          }
          memory="Feeling like I'm flying on the Avatar Flight of Passage ride in Pandora"
          name="Kelly Swanson-Obando"
        />
        <FlipCard
          image={
            <img alt="Jeb" src={imageFolder + 'Jeb.webp'} {...SHARED_PROPS} />
          }
          memory="Exploring the halloween party with my siblings and eating all the desserts"
          name="Jeb Wagner"
        />
        <FlipCard
          image={
            <img
              alt="Casper"
              src={imageFolder + 'Casper.webp'}
              {...SHARED_PROPS}
            />
          }
          memory="Spending the night in Cinderella Castle and being a part of the parade during the year of a million dreams"
          name="Casper Wagner"
        />
        <FlipCard
          image={
            <img
              alt="Jeremy"
              src={imageFolder + 'Jeremy.webp'}
              {...SHARED_PROPS}
            />
          }
          memory="Accidentally cutting to the front of the line for Donald Duck"
          name="Jeremy Charles"
        />
      </div>
    </>
  );
}
