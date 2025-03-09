import React from 'react';
import * as styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <a
          aria-label="Reach out to me on Discord"
          href="https://discordapp.com/users/ultra_arcite"
        >
          <i className="fa-brands fa-discord fa-2x" />
        </a>
        <a
          aria-label="Watch some of my videos"
          href="https://www.youtube.com/@ultraArcite"
        >
          <i className="fa-brands fa-youtube fa-2x" />
        </a>
        <a
          aria-label="Add me as a friend on Playstation Network so we can play games together"
          href="https://profile.playstation.com/ultraArcite"
        >
          <i className="fa-brands fa-playstation fa-2x" />
        </a>
      </div>
    </footer>
  );
}
