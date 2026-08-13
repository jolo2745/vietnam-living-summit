import shared from "../../components/summit/SummitShared.module.css";
import styles from "./RelocationEcosystem.module.css";

const sectors = [
  "Housing", "Legal & visas", "Banking", "Healthcare", "Schools", "Insurance", "Moving",
  "Careers", "Language", "Community", "Lifestyle", "Family support", "Business setup", "Local experiences",
];

export function RelocationEcosystem() {
  return (
    <section className={`${styles.ecosystem} wrap`}>
      <div className={`${shared.sectionHeading} ${shared.sectionHeadingInline}`}>
        <div>
          <p className={shared.kicker}>The ecosystem</p>
          <h2>Every part of your move,<br /><em>connected.</em></h2>
        </div>
        <p>Explore the services that shape a successful move. On the day, we help direct you to the conversations that matter most.</p>
      </div>
      <div className={styles.grid}>
        {sectors.map((sector) => (
          <div key={sector}><p>{sector}</p><i>↗</i></div>
        ))}
      </div>
    </section>
  );
}
