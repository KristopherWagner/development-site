import { createFileRoute, Link } from '@tanstack/react-router';

import Footer from '../../components/Footer';
import BlogLink from '../../components/Footer/BlogLink';
import HomeLink from '../../components/Footer/HomeLink';
import Header from '../../components/Header';

import { Route as Cookbook } from '../cookbook';

function Introduction() {
  return (
    <>
      <Header heading="introduction" />
      <main>
        <section>
          <p>
            ❄️ In 2016 after shoveling my car and my girlfriend's car out of 31"
            of snow, I noticed that the car parked outside of my apartment had a
            handicap placard on the rearview mirror. So I shoveled the snow
            around a third car. The next morning, I couldn't get out of bed
            because my back hurt that much. So, I found a job in Florida and
            haven't touched a snow shovel since. 😏
          </p>
        </section>
        <section>
          <h2>who is he?</h2>
          <p>
            🔎 I'm Kristopher Wagner. If you skipped the home page, the short
            version is: husband, father, runner, maker, vegetarian, and
            relentless researcher. I read tech specs, professional reviews, and
            user reviews; then wait a month before buying anything, just to be
            sure. I watch YouTube videos and read research papers to design my
            breakfast. I measure my coffee to the gram before putting it in a
            $12 French press, because the grinder ($400) and the beans
            ($25/pound) are where money is well-spent. 🤷‍♂ I also get paid to
            write code. 😬 I'm a little nervous writing a blog, and I can't
            promise I'll be consistent. But I hope to share products I actually
            use, walk through problems I've solved, and occasionally teach you
            something interesting. Absolute worst case, I'll write at least one
            thing that embarrasses my son. 😎
          </p>
        </section>
        <section>
          <h2>why does he run?</h2>
          <p>
            <i>It's not for the banana at the finish line.</i>
            <br />
            🏃‍♂️ If you read an article about running, know that I have been
            running since 2005 when I saw Jerome Bettis sitting on the sideline
            with an oxygen mask on his face. I asked my dad what was wrong, and
            he told me that Bettis had asthma. I'd been struggling with asthma
            for years, and that day I decided: if Jerome Bettis could play in
            the NFL with it, I could live a normal life with it 😌.
          </p>
        </section>
        <section>
          <h2>can I trust him?</h2>
          <p>
            💸 If you read an article about finance or a product review, know
            that I struggled with money for a large portion of my life. I
            graduated with 6-figures of college loans and 5-figures of credit
            card debt, so I know what's it like to not be able to afford rent
            and debt payments (this was another reason I moved to Florida).
            Today our only debt is our mortgage and my wife's car. If I
            recommend something, it's because I'd buy it again, lg stop 🎯.
          </p>
        </section>
        <section>
          <h2>can he cook?</h2>
          <p>
            <i>Barely</i>
            <br />
            🙃 I'm not a chef, though I do make a mean breakfast, so if you cook
            any of our
            <Link
              aria-label="Navigate to the Wagner family cookbook"
              to={Cookbook.to}
            >
              favorite recipes
            </Link>
            , my wife has made them many times and I find them delicious 😋.
          </p>
        </section>
        <section>
          <h2>you're still here?</h2>{' '}
          <p>
            🙇‍♂️ If you made it this far, thanks! You just read roughly 500 words
            about a software engineer who runs, makes things, eats food that
            doesn't kill animals, and researches everything to an almost
            unreasonable degree. When I implement comments, I hope that you'll
            say hello 👋!
          </p>
        </section>
        <hr />
        <section>
          <p>
            👨‍💻 <i>Written by me;</i> 🤖{' '}
            <i>Proof-read by my good friend Claude</i>
          </p>
        </section>
      </main>
      <Footer>
        <HomeLink />
        <BlogLink />
      </Footer>
    </>
  );
}

export const Route = createFileRoute('/blog/introduction')({
  component: Introduction,
});
