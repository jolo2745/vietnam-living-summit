import styles from "./PartnerLevels.module.css";

const levels = [
  {
    name: "Media & Community Partner",
    shortName: "Community",
    benefits: [
      "Logo placement in the “With support from” section",
      "Two complimentary tickets to the main summit and VIP networking event",
      "Access to B2B cross-networking opportunities with alliance members",
      "Exclusive media coverage and interview rights at the event",
    ],
  },
  {
    name: "Expert Partner",
    shortName: "Expert",
    benefits: [
      "All Media & Community Partner benefits",
      "Exhibition booth and dedicated one-to-one consultation desk",
      "Dedicated social media feature before the summit",
      "VIP invitation to the Alliance Partner Dinner",
      "Access to pre-matched client leads through advisory matchmaking",
      "Participation in the Alliance Cross-Referral Commission Network",
    ],
  },
  {
    name: "Gold Partner",
    shortName: "Gold",
    benefits: [
      "All Expert Partner benefits",
      "Prime centre-stage booth placement in the exhibition zone",
      "Medium-sized logo on key visuals, backdrops, and marketing collateral",
      "Three-to-five-minute main-stage presentation or keynote slot",
      "Two C-level VIP invitations to the Alliance Partner Dinner",
      "Featured placement in two-to-three PR articles and the digital campaign series",
      "Priority B2B matching with key ecosystem stakeholders",
    ],
  },
  {
    name: "Co-organizer Partner",
    shortName: "Co-organizer",
    benefits: [
      "Exclusive “Co-organized with TUBUDD” status across all platforms",
      "Co-opening speech and an exclusive media or brand activation corner",
      "Largest logo placement across physical and digital collateral",
      "Attendee database access, subject to privacy consent",
      "Co-developed feature stories across major media and e-magazine channels",
      "Tailored long-term commercial rights and referral revenue sharing",
    ],
  },
];

export function PartnerLevels() {
  return (
    <section className={`${styles.levels} wrap`} id="partnership-levels">
      <div className={styles.heading}>
        <div>
          <p className={styles.kicker}>Partnership levels</p>
          <h2>Choose your place<br />in the <em>alliance.</em></h2>
        </div>
        <p className={styles.intro}>
          Four ways to take part, from supporting the community to shaping the summit alongside TUBUDD.
        </p>
      </div>

      <div className={styles.grid}>
        {levels.map(({ name, shortName, benefits }, index) => (
          <article className={styles.card} key={name}>
            <div className={styles.cardHeader}>
              <span className={styles.number}>0{index + 1}</span>
              <span className={styles.shortName}>{shortName}</span>
            </div>
            <h3>{name}</h3>
            <ul>
              {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
