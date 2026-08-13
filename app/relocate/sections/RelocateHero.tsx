import Image from "next/image";
import shared from "../../components/summit/SummitShared.module.css";
import styles from "./RelocateHero.module.css";

export function RelocateHero() {
  return (
    <section className={`${styles.hero} wrap`}>
      <div className={styles.copy}>
        <h1>Vietnam Living<br /><em>Summit 2026.</em></h1>
        <p className={styles.lede}>The ecosystem for living, working, and growing in Vietnam.</p>
        <div className={styles.actions}>
          <a className={`${shared.button} ${styles.primaryButton}`} href="mailto:hello@meetannie.co?subject=Vietnam%20Living%20Summit%202026">Register interest <span>↗</span></a>
          <a className={shared.textLink} href="#event-overview">Explore the event <span>↓</span></a>
        </div>
        <dl className={styles.quickFacts}>
          <div><dt>Where</dt><dd>Hanoi, Vietnam</dd></div>
          <div><dt>Entry</dt><dd>Free for attendees</dd></div>
        </dl>
      </div>

      <div className={styles.visual}>
        <div className={styles.photo}>
          <Image
            src="/images/people-community.jpg"
            alt="People meeting and building new connections at a community event"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 47vw"
          />
        </div>
        <div className={styles.poster} aria-label="Event summary">
          <span className={styles.posterLabel}>Vietnam&apos;s relocation ecosystem</span>
          <strong>14</strong>
          <p>key service <br />sectors under one roof  <br />helping you get started</p>
        </div>
        <div className={styles.stamp} aria-hidden="true">ARRIVE<br />READY</div>
      </div>
    </section>
  );
}
