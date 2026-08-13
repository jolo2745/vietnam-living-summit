import shared from "../../components/summit/SummitShared.module.css";
import styles from "./PartnerProcess.module.css";

export function PartnerProcess() {
  return (
    <section className={styles.process}>
      <div className={`${styles.grid} wrap`}>
        <div className={shared.sectionHeading}>
          <p className={shared.kicker}>The standard</p>
          <h2>Good fit first.<br />Growth <em>follows.</em></h2>
        </div>
        <ol className={styles.steps}>
          <li><div><h3>We learn where you add value</h3><p>Your service, standards, coverage, and the customers you are best equipped to help.</p></div></li>
          <li><div><h3>We design the right presence</h3><p>A clear role at the summit, with expectations shaped around attendee value and genuine fit.</p></div></li>
          <li><div><h3>We keep the network useful</h3><p>The summit begins the relationship; thoughtful referrals and collaboration continue it.</p></div></li>
        </ol>
      </div>
    </section>
  );
}
