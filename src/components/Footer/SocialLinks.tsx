import Bluesky from './Bluesky';
import HowLongToBeat from './HowLongToBeat';
import Mastodon from './Mastodon';
import Pixelfed from './Pixelfed';

export default function SocialLinks() {
  return (
    <>
      <li>
        <a
          aria-label="Reach out to me on Discord"
          href="https://discordapp.com/users/ultra_arcite"
          title="Discord"
        >
          <i className="fa-brands fa-discord fa-fw" />
          <span>Discord</span>
        </a>
      </li>
      <li>
        <a
          aria-label="Watch some of my videos"
          href="https://www.youtube.com/@ultraArcite"
          title="YouTube"
        >
          <i className="fa-brands fa-youtube fa-fw" />
          <span>YouTube</span>
        </a>
      </li>
      <li>
        <a
          aria-label="Add me as a friend on Playstation Network so we can play games together"
          href="https://profile.playstation.com/ultraArcite"
          title="PlayStation"
        >
          <i className="fa-brands fa-playstation fa-fw" />
          <span>Playstation Network</span>
        </a>
      </li>
      <li>
        <a
          aria-label="Follow me on Strava"
          href="https://www.strava.com/athletes/27088613"
          title="Strava"
        >
          <i className="fa-brands fa-strava fa-fw" />
          <span>Strava</span>
        </a>
      </li>
      <li>
        <a
          aria-label="Look at some of my recent photos"
          href="https://pixelfed.social/kwagner_dev"
          title="pixelfed"
        >
          <Pixelfed />
          <span>pixelfed</span>
        </a>
      </li>
      <li>
        <a
          aria-label="Check if I said something witty"
          href="https://bsky.app/profile/kwagner.dev"
          title="Bluesky"
        >
          <Bluesky />
          <span>Bluesky</span>
        </a>
      </li>{' '}
      <li>
        <a
          aria-label="Read some books with me"
          href="https://app.thestorygraph.com/profile/kwagner_dev"
          title="BookWyrm"
        >
          <i className="fa-solid fa-books fa-fw" />
          <span>The StoryGraph</span>
        </a>
      </li>
      <li>
        <a
          aria-label="Track your games with me"
          href="https://howlongtobeat.com/user/ultra_arcite"
          title="HowLongToBeat"
        >
          <HowLongToBeat />
          <span>HowLongToBeat</span>
        </a>
      </li>
      <li>
        <a
          aria-label="Read some of my favorite articles"
          href="https://mastodon.social/@kwagner_dev"
          rel="me"
          title="Mastodon"
        >
          <Mastodon />
          <span>Mastodon</span>
        </a>
      </li>
    </>
  );
}
