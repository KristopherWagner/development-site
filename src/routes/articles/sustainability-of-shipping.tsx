import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';

import Footer from '../../components/Footer';
import ArticlesLink from '../../components/Footer/ArticlesLink';
import Header from '../../components/Header';
import HomeLink from '../../components/Footer/HomeLink';
import Seo from '../../components/SEO';

import styles from './articles.module.css';

export default function RouteComponent() {
  return (
    <>
      <Seo
        description="Explained: The Sustainability Of Shipping"
        imageUrl=""
        title="Explained: The Sustainability Of Shipping"
        url="https://bitetoothpastebits.com/blogs/blog/de-mystifying-the-sustainability-of-shipping"
      />
      <Header heading="Explained: The Sustainability Of Shipping">
        <p>
          I used to think that sending away for an item and having it shipped to
          my house was bad for the environment. In some cases, like Amazon Prime
          2-day shipping, it is terrible for the environment, but in other cases
          it's better than going to the store to get it myself.
        </p>
        <p>
          BECAUSE IT'S THE EARTH (BITE) is one of my favorite companies. I found
          them when searching for plastic-free toothpaste and mouthwash that
          didn't require shipping water weight. Below is the full text from
          their article{' '}
          <a href="https://bitetoothpastebits.com/blogs/blog/de-mystifying-the-sustainability-of-shipping">
            Explained: The Sustainability Of Shipping
          </a>
        </p>
      </Header>
      <main className={clsx('main', 'hyper-legible', styles.root)}>
        <h2>Let's talk shipping.</h2>
        <p>
          When we started Bite, one of the first things we thought about was
          shipping. Because here’s the thing: we have a product that’s good for
          the environment and will help to reduce waste, but it can’t do any of
          that if we can’t get it to you! And, of course, getting anything
          anywhere requires energy and fuel.
        </p>
        <p>
          In order to understand how our shipping was going to affect the
          environment, we did a little digging. According to this MIT study, in
          general, online shopping is more sustainable than buying from a brick
          and mortar store as long as it isn't rushed.
        </p>
        <p>
          We know it seems a little counterintuitive - the reasons for this are
          varied and a little bit confusing, but let us explain why that is and
          what we do to keep our carbon footprint under control.
        </p>
        <section>
          <h3>
            First of all, a brick and mortar store (aka, a physical store you
            can walk into with your body) doesn’t have the luxury of knowing how
            much of any item it’s actually going to sell.
          </h3>
          <p>
            As a result, the store has to stay fully stocked, and that’s
            accomplished by shipping items to nearby warehouses and then to the
            stores, usually by freight truck. Sometimes goods need to be moved
            from location to location depending on sales and sales projections.
          </p>
          <p>
            On the flip side, an online retailer (hi, that's us!) freights only
            to one warehouse where it stays until it is actually ordered,
            cutting down on unnecessary travel and multiple facility energy
            overheads.
          </p>
        </section>
        <section>
          <h3>
            Another factor to consider is the movement of the consumer (you!).
          </h3>
          <p>
            In order to shop in a store, you need to get in your car and drive
            to that store. Of course, this is less of a factor if you live in a
            city and take public transportation, but we're speaking generally
            here.
          </p>
          <p>
            You driving to the store to pick up that tube has a carbon cost with
            many people collectively driving their individual cars to individual
            stores, that carbon footprint adds up fast.
          </p>
        </section>
        <section>
          <h3>There’s also the issue of packaging. </h3>
          <p>
            The carbon footprint of the shipping packaging can (clearly) be more
            robust than when you’re buying something in a store. To mitigate
            that, we use post consumer and recyclable cardboard packaging with
            paper tape and recycled kraft fill — every piece of a Bite package
            is 100% recyclable or compostable.
          </p>
          <p>
            We also make sure it's sized properly (some companies send all their
            products in the same size box to save on costs) and is created to be
            lightweight while durable enough to protect our glass bottles. No
            plastic bubble wrap, no plastic tape, no unnecessary void fill.{' '}
          </p>
        </section>
        <section>
          <h3>Finally, we want to talk about rush shipping —</h3>
          <p>
            because this is where online shopping loses its advantage. With
            2-day shipping options on the rise, the environmental impact of
            online shopping is going up and up. Because of this, we do not offer
            rush shipping . Instead, when you place an order, your Bits travel
            to you by what we call the "public transit system" of shipping,
            USPS.
          </p>
        </section>
        <section>
          <h3>
            No matter where you live, if you are in the US, there is a good
            chance a postal worker is going to come by your mailbox every single
            business day, whether you have mail or you don't.
          </h3>
          <p>
            This person is using an existing postal route that will be followed
            no matter what and by using USPS, your Bits essentially hitch a ride
            along this slow and predetermined system (a la the "public transit"
            of delivery) which significantly cuts down on the carbon footprint
            of your delivery, similarly to if you took a bus instead of taking a
            car. Sometimes you may notice your shipment says DHL. This is their
            bulk shipping method that is then individually dropped off via USPS,
            and carries a similar carbon footprint.{' '}
          </p>
          <p>
            In contrast, when you select 2 Day Shipping or (gasp) Overnight, a
            special trip is made specifically to your house for your order in a
            very small amount of time which not only leads to way higher carbon
            footprint for the transit of your order, if the company is using
            cheap oversize boxes with bubble wrap to fill the void (as we talked
            about above), it's now a double hit.
          </p>
          <p>
            We get that it takes longer but it’s important to us that Bite is
            about a larger mission, and that we’re doing everything we can to
            keep our carbon footprint low. We hope you support us as we’re stick
            to our guns on this one and as the saying goes "good things come to
            those who wait."
          </p>
        </section>
        <img src="https://cdn.shopify.com/s/files/1/1864/2187/files/carbon-footprint1_1024x1024.png?v=1549485364" />
      </main>
      <Footer>
        <HomeLink />
        <ArticlesLink />
      </Footer>
    </>
  );
}

export const Route = createFileRoute('/articles/sustainability-of-shipping')({
  component: RouteComponent,
});
