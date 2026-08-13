import shared from "../../components/summit/SummitShared.module.css";
import styles from "./AttendeeBenefits.module.css";

const benefits = [
  ["Clear English-Guided Support", "Overcome local bureaucracy and complex procedures effortlessly with direct guidance from vetted, English-speaking experts."],
  ["Free 1-on-1 Expert Consultations", "Book dedicated private sessions with top specialists across legal, real estate, banking, and education tailored to your specific needs."],
  ["All-in-One Trusted Ecosystem", "Access a fully verified network of top-tier local service providers in one place, saving you time, money, and stress."],
];

export function AttendeeBenefits() {
  return (
    <section className={styles.benefits}>
      <div className="wrap">
        <div className={`${shared.sectionHeading} ${styles.heading}`}>
          <p className={shared.kicker}>Why you should join us</p>
          <h2>Why Attend the Vietnam<br />Living Summit <em>?</em></h2>
        </div>
        <div className={styles.grid}>
          {benefits.map(([title, text]) => (
            <article key={title}>
              <div className={styles.icon} aria-hidden="true"><i /><i /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
