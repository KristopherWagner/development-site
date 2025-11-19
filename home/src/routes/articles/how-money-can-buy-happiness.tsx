import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';

import Header from '@kwagner-dev/header';
import Seo from '@kwagner-dev/seo';

import styles from './articles.module.css';

export default function RouteComponent() {
  return (
    <>
      <Seo
        description="It's not about how much you make. It's about how well you spend."
        imageUrl=""
        title="How Money Can Buy Happiness—Wait, What?"
        url="https://www.ynab.com/blog/how-money-can-buy-happiness-wait-what"
      />
      <Header heading="How Money Can Buy Happiness">
        <p>
          I think a common misconception is that you should always "save" money.
          I think that's the wrong way to look at money. Money is a
          representation of how much of your life you're converting to a
          currency you can spend to improve the rest of your life.{' '}
          <em>Saving money is the same as wasting your life</em>. If you don't
          die with zero dollars to your name then you have traded hours of your
          life for nothing.
        </p>
        <p>
          You Need a Budget (YNAB) has changed my life and the lives of my wife
          and her two best friends. They do not tell you what you can spend your
          money on but instead give you four general rules to avoid debt and
          live "spendfully." Below is the full text from their article{' '}
          <a href="https://www.ynab.com/blog/how-money-can-buy-happiness-wait-what">
            How Money Can Buy Happiness—Wait, What?
          </a>
        </p>
      </Header>
      <main className={clsx('main', 'hyper-legible', styles.root)}>
        <section>
          <h2>The Happiness Plateau—is it real?</h2>

          <p>
            Recently, I listened to a Planet Money episode that discussed the
            old idea that money can't buy happiness, and it asked if
            psychological research bore that out. And, let me tell you, it was
            fascinating. You should definitely give it a listen.
          </p>

          <p>
            First, they discussed the famous 2010 study by Nobel Prize winners
            Daniel Kahneman and Angus Deaton. That study found that higher
            household incomes actually do correlate with greater happiness, but
            only up to a point. Once a household's income reaches around $75,000
            USD a year (the range they gave was actually $60-90k, to be exact),
            more money didn't seem to make any difference in how they measured
            people's emotional well being.
          </p>

          <p>
            That $75,000 threshold has come to be known as the Happiness
            Plateau—the point at which more money does not buy any more
            happiness.
          </p>

          <p>
            This study was so famous, that for the past decade people have run
            with it as solid evidence that money doesn't buy happiness, at least
            no more happiness than a basic middle-class income provides.
          </p>

          <p>
            And it feels right, doesn't it? Once your basic needs are met and
            you have some reasonable comforts, why would you need more money to
            be happy? It also feels good to think that people who are much
            wealthier than ourselves are actually not much happier than we are.
            That's probably why this idea of a happiness plateau is so common
            it's practically a cliche at this point.
          </p>
        </section>

        <section>
          <h2>Plot twist…</h2>

          <p>
            What if I told you that a 2021 study questioned all of this? It
            turns out that more money actually does correlate with more
            happiness well beyond the tried-and-true $75,000 mark, and it's not
            just due to inflation.
          </p>

          <p>
            Psychologist Matt Killingsworth killed our sense of worth (see what
            I did there?) with a new study using more robust data collection
            methodologies that found that people are generally happier the more
            money they make.
          </p>

          <p>
            Turns out money can buy happiness after all. Every
            after-school-special you've ever watched about a workaholic dad in a
            sad business suit was wrong.
          </p>

          <p>
            Well, at YNAB we know that's not the whole story. You don't have to
            be a bajillionaire to experience true happiness. There's another
            way: lining up your money and your values . But more on that later,
            because there's more research to discuss.
          </p>
        </section>

        <section>
          <h2>But it's not just about the money</h2>

          <p>
            So how to reconcile these two studies? This is where it gets really
            interesting.
          </p>

          <p>
            The two groups of researchers got together to try to figure out why
            they disagreed so strongly. After concluding their methodologies
            were both sound, they realized that they came to different
            conclusions, because they were actually measuring different things.
          </p>

          <p>
            If you're a research nerd, you'll have to listen to the podcast
            episode for all the juicy science details, but the bottom line is:
            it's not really about how much money you make, it's about how you
            spend it.
          </p>

          <p>
            The most interesting information came when the researchers looked
            closer at the people on the extremes—the happiest and the saddest
            people in their study.
          </p>

          <p>
            For the saddest people in the study—the people who consistently
            reported the least amount of happiness—there actually was a
            happiness plateau. But for the happiest people in the study—the
            people who consistently reported the highest amount of happiness—the
            plateau disappeared. In fact, there was an exponential increase in
            happiness the higher their income rose.
          </p>

          <p>
            What does this mean? Well, I love the way that one of the podcast
            hosts, Sally Helm, put it: "Maybe these are just people who know how
            to spend money really well on things that make them happy."
          </p>

          <p>
            She was exactly right. It turns out happiness does have a
            relationship with money. But that relationship is not in how much
            you make, it's in how well you spend.
          </p>

          <blockquote>
            <p>
              ...happiness does have a relationship with money. But that
              relationship is not in how much you make, it's in how well you
              spend.
            </p>
          </blockquote>

          <p>
            I've seen this in my own life too. When I started using YNAB, I
            wasn't actually making more money, I was just spending it more
            intentionally. As I consistently gave every dollar a job, I
            discovered the kind of spending that made me the most happy and
            started shoveling my money in that direction. So even though I
            wasn't making any more money, I felt happier.
          </p>

          <p>
            If you aren't spending your money well, it doesn't matter how much
            you make. Your increased income is not going to contribute to
            increased happiness. But if you are spending your money well, the
            happiness your spending brings only increases as you make—and
            therefore spend—more.
          </p>
        </section>

        <section>
          <h2>What does it mean to spend money well?</h2>

          <p>
            So this begs the question, "What does it mean, then, to spend money
            well?" I'm happy to say I've got an answer for you! After all,
            that's what we've been teaching here at YNAB for over 20 years!
          </p>

          <p>
            Spending money well means cultivating an alignment between how you
            spend your money and the life you want to live. It means aligning
            your spending with what matters most to you—what we call
            spendfulness.
          </p>

          <p>
            Discovering what matters most to you is a continuous pursuit that we
            all must make on our own. That's why you'll never see any of us at
            YNAB tell you how to spend your money. But we do have a practice to
            help you define your priorities and values.
          </p>

          <p>
            The YNAB Method is the practice that will help you achieve this
            state of alignment between your spending, and well, your self. You
            do that by consistently giving every dollar a job, by deciding what
            you want to do with your money before you spend it.
          </p>

          <p>
            As you do, you'll not only discover what you want out of life but
            you'll create a framework to make sure your money flows toward those
            things.
          </p>

          <p>
            This practice will allow you to spend without guilt and without
            second guessing, to live freely knowing that you are actually
            spending your money exactly how you truly want to. The end result
            will be more happiness, and—the research now suggests—even more
            happiness the more money you spend.
          </p>
        </section>

        <section>
          <h2>It's all about how you spend</h2>

          <p>
            If your spending doesn't bring you happiness now, more spending
            won't help. But if you do the work to discover what you want most
            out of life and make sure your money flows toward those things, your
            spending can increase your happiness.
          </p>

          <p>
            So, maybe the Beatles were wrong in not caring too much for money.
            After all, they seemed to change their tune about it eventually.
            And, sure, money in and of itself is just money. It's what you do
            with it that matters. If you can align your money toward your
            priorities, and have a life full of the things that matter most to
            you, well, that is a happy life.
          </p>

          <p>
            So, can money buy happiness? Sure. It just depends on how you spend
            it.
          </p>
        </section>

        <section>
          <p>
            <strong>
              There is no better way to discover what you want out of life than
              to consistently give every dollar a job. Sign up for a free trial
              of YNAB today, and we'll show you how.
            </strong>
          </p>
        </section>
      </main>
    </>
  );
}

export const Route = createFileRoute('/articles/how-money-can-buy-happiness')({
  component: RouteComponent,
});
