import "@fontsource/montserrat";
import "@fontsource/roboto";

import Seo from "./components/SEO";

import About from "./components/wedding/About";
import Covid from "./components/wedding/Covid";
import EventDetails from "./components/wedding/EventDetails";
import Faq from "./components/wedding/FAQ";
import Navigation from "./components/wedding/Navigation";
import Parallax from "./components/wedding/Parallax";
import Schedule from "./components/wedding/Schedule";
import Section from "./components/wedding/Section";
import Travel from "./components/wedding/Travel";
import { imageFolder } from "./constants";

import styles from "./wedding.module.css";

export default function WeddingPage() {
  return (
    <>
      <Seo
        description="All of the details for our Disney Fairy Tale Wedding"
        imageUrl="https://kwagner.dev/static/starlight_lounge-cf67d74b7be4b4baf494389267fa8e60.webp"
        title="Swanson/Wagner Wedding"
        url="https://kwagner.dev/wedding"
      />
      <div className={styles.root}>
        <Navigation />
        <Parallax
          aspectRatio="5000/3293"
          url={imageFolder + "wheel_far_away.webp"}
        />
        <Parallax
          aspectRatio="3327/5000"
          mobile
          url={imageFolder + "wheel_kissing.webp"}
        />
        <Section anchor="details" variant="light">
          <EventDetails />
        </Section>
        <Parallax
          aspectRatio="2309/1536"
          url={imageFolder + "starlight_lounge.webp"}
        />
        <Parallax
          aspectRatio="3501/5000"
          mobile
          url={imageFolder + "heads_touching.webp"}
        />
        <Section anchor="travel" variant="primary">
          <Travel />
        </Section>
        <Parallax
          aspectRatio="5000/3327"
          url={imageFolder + "wheel_standing.webp"}
        />
        <Parallax
          aspectRatio="3339/5000"
          mobile
          url={imageFolder + "twirling.webp"}
        />
        <Section anchor="covid" variant="light">
          <Covid />
        </Section>
        <Parallax
          aspectRatio="5000/3327"
          url={imageFolder + "plaza_walking.webp"}
        />
        <Parallax
          aspectRatio="3335/4383"
          mobile
          url={imageFolder + "santa_baby.webp"}
        />
        <Section anchor="about" variant="secondary">
          <About />
        </Section>
        <Parallax
          aspectRatio="5000/3507"
          url={imageFolder + "bridge_kissing.webp"}
        />
        <Parallax
          aspectRatio="3564/5000"
          mobile
          url={imageFolder + "archway.webp"}
        />
        <Section anchor="schedule" variant="primary">
          <Schedule />
        </Section>
        <Parallax
          aspectRatio="5000/3271"
          url={imageFolder + "wheel_walking.webp"}
        />
        <Parallax
          aspectRatio="2787/4270"
          mobile
          url={imageFolder + "eskimo_kisses.webp"}
        />
        <Section anchor="faq" variant="light">
          <Faq />
        </Section>
      </div>
    </>
  );
}
