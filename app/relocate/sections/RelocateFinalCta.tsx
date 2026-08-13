import shared from "../../components/summit/SummitShared.module.css";
import styles from "./RelocateFinalCta.module.css";

export function RelocateFinalCta() {
  return (
    <section className={styles.finalCta}>
      <div className={`${styles.grid} wrap`}>
        <div>
          <p className={shared.kicker}><span>Free entry</span> Hanoi · 2026</p>
          <h2>Your life in Vietnam<br />starts with the <em>right room.</em></h2>
        </div>
        <div className={styles.action}>
          <p>Join the early-access list for date, venue, and registration updates.</p>
          <a className={`${shared.button} ${shared.buttonDark}`} href="mailto:hello@meetannie.co?subject=Vietnam%20Living%20Summit%202026">Register interest <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}
