import HowLongToBeat from './HowLongToBeat';

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
          aria-label="Read some books with me"
          href="https://app.thestorygraph.com/profile/kwagner_dev"
          title="Story Graph"
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
    </>
  );
}
