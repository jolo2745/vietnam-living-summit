import shared from "../../components/summit/SummitShared.module.css";
import styles from "./RelocateJourney.module.css";

export function RelocateJourney() {
  return (
    <section className={styles.journey}>
      <div className={`${styles.grid} wrap`}>
        <div className={shared.sectionHeading}>
          <p className={shared.kicker}>Your day</p>
          <h2>Discover.<br />Meet.<br /><em>Move forward.</em></h2>
        </div>
        <ol className={styles.steps}>
          <li><div><h3>Tell us what you need</h3><p>Share your priorities when you register so the day can be more relevant from the start.</p></div></li>
          <li><div><h3>Meet your best-fit experts</h3><p>Join focused conversations and short sessions built around real relocation decisions.</p></div></li>
          <li><div><h3>Leave with a next-step map</h3><p>Know who to contact, what to tackle first, and where Annie can help keep things moving.</p></div></li>
        </ol>
      </div>
    </section>
  );
}
