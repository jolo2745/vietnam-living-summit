import shared from "../../components/summit/SummitShared.module.css";
import styles from "./EventOverview.module.css";

export function EventOverview() {
  return (
    <section className={`${styles.overview} wrap`} id="event-overview">
      <div className={shared.sectionHeading}>
        <p className={shared.kicker}>Event overview</p>
        <h2>Why Attend the Vietnam Living Summit<em>?</em></h2>
      </div>
      <div className={styles.grid}>
        <article>
          <h3>14 key service sectors under one roof</h3>
          <p>Access a fully verified network of top-tier local service providers in one place, saving you time, money, and stress.</p>
        </article>
        <article>
          <h3>Direct 1-on-1 expert matchmaking</h3>
          <p>Book dedicated private sessions with top specialists across legal, real estate, banking, and education tailored to your specific needs.</p>
        </article>
        <article className={styles.highlight}>
          <h3>Free entry</h3>
          <p>Overcome local bureaucracy and complex procedures effortlessly with direct guidance from vetted, English-speaking experts.</p>
        </article>
      </div>
    </section>
  );
}
