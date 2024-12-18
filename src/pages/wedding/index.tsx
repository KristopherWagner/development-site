import React from 'react';

import '@fontsource/montserrat';
import '@fontsource/roboto';
import '../../font-awesome/css/fontawesome.min.css';
import '../../font-awesome/css/brands.min.css';
import '../../font-awesome/css/duotone.min.css';
import '../../font-awesome/css/solid.min.css';
import './wedding.css';

import {
  About,
  Covid,
  EventDetails,
  Faq,
  Navigation,
  Parallax,
  Section,
  Schedule,
  Travel,
} from '../../components';

// Desktop
import BridgeKissing from '../../images/bridge_kissing.webp';
import PlazaWalking from '../../images/plaza_walking.webp';
import StarlightLounge from '../../images/starlight_lounge.webp';
import WheelFarAway from '../../images/wheel_far_away.webp';
import WheelStanding from '../../images/wheel_standing.webp';
import WheelWalking from '../../images/wheel_walking.webp';

// Mobile
import Archway from '../../images/archway.webp';
import EskimoKisses from '../../images/eskimo_kisses.webp';
import HeadsTouching from '../../images/heads_touching.webp';
import SantaBaby from '../../images/santa_baby.webp';
import Twirling from '../../images/twirling.webp';
import WheelKissing from '../../images/wheel_kissing.webp';
import Seo from '../../components/SEO';

export default function WeddingPage() {
  return (
    <>
      <Navigation />
      <Parallax aspectRatio="5000/3293" url={WheelFarAway} />
      <Parallax aspectRatio="3327/5000" mobile url={WheelKissing} />
      <Section anchor="details" variant="light">
        <EventDetails />
      </Section>
      <Parallax aspectRatio="2309/1536" url={StarlightLounge} />
      <Parallax aspectRatio="3501/5000" mobile url={HeadsTouching} />
      <Section anchor="travel" variant="primary">
        <Travel />
      </Section>
      <Parallax aspectRatio="5000/3327" url={WheelStanding} />
      <Parallax aspectRatio="3339/5000" mobile url={Twirling} />
      <Section anchor="covid" variant="light">
        <Covid />
      </Section>
      <Parallax aspectRatio="5000/3327" url={PlazaWalking} />
      <Parallax aspectRatio="3335/4383" mobile url={SantaBaby} />
      <Section anchor="about" variant="secondary">
        <About />
      </Section>
      <Parallax aspectRatio="5000/3507" url={BridgeKissing} />
      <Parallax aspectRatio="3564/5000" mobile url={Archway} />
      <Section anchor="schedule" variant="primary">
        <Schedule />
      </Section>
      <Parallax aspectRatio="5000/3271" url={WheelWalking} />
      <Parallax aspectRatio="2787/4270" mobile url={EskimoKisses} />
      <Section anchor="faq" variant="light">
        <Faq />
      </Section>
    </>
  );
}

export const Head = () => (
  <>
    <html lang="en-US" />
    <Seo
      description="All of the details for our Disney Fairy Tale Wedding"
      imageUrl="https://kwagner.dev/static/starlight_lounge-cf67d74b7be4b4baf494389267fa8e60.webp"
      title="Swanson/Wagner Wedding"
      url="https://kwagner.dev/wedding"
    />
  </>
);
