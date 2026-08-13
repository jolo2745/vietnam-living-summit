import shared from "../../components/summit/SummitShared.module.css";
import styles from "./PartnerBenefits.module.css";

const benefits = [
  ["Tap into a High-Potential Market", "Connect directly with a curated audience of expats, foreign professionals, and international visitors actively seeking trusted local services."],
  ["Cross-Client Referral Network", "Collaborate with complementary service providers to exchange leads, drive cross-sales, and offer all-in-one solutions."],
  ["Exclusive Partner Dinner", "Join an intimate VIP dinner prior to the summit to launch the alliance, network with executive peers, and align on joint strategies."],
];

export function PartnerBenefits() {
  return (
    <section className={`${styles.benefits} wrap`} id="partner-benefits">
      <div className={`${shared.sectionHeading} ${styles.heading}`}>
        <p className={shared.kicker}>Why you should join us</p>
        <h2>Grow Your Business with <em>TUBUDD alliance.</em></h2>
      </div>
      <div className={styles.grid}>
        {benefits.map(([title, text], index) => (
          <article className={index === 2 ? styles.highlight : undefined} key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
