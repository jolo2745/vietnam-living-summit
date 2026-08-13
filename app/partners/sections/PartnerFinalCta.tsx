import shared from "../../components/summit/SummitShared.module.css";
import styles from "./PartnerFinalCta.module.css";

export function PartnerFinalCta() {
  return (
    <section className={styles.finalCta}>
      <div className={`${styles.grid} wrap`}>
        <div>
          <p className={shared.kicker}><span>Partner with us</span> Hanoi · 2026</p>
          <h2>Help people arrive<br /><em>better.</em></h2>
        </div>
        <div className={styles.action}>
          <p>Tell us what your business does best and how you want to contribute.</p>
          <a className={`${shared.button} ${styles.button}`} href="mailto:hello@meetannie.co?subject=Vietnam%20Living%20Summit%20Partnership">Start a conversation <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}
