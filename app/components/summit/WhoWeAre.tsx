import Image from "next/image";
import styles from "./WhoWeAre.module.css";

const proof = [
  ["50,000+", "clients supported"],
  ["9,000,000+", "content views"],
  ["200+", "trusted partners"],
];

type WhoWeAreProps = {
  tone: "people" | "business";
};

export function WhoWeAre({ tone }: WhoWeAreProps) {
  return (
    <section className={`${styles.section} ${styles[tone]} wrap`} id="who-we-are">
      <div className={styles.layout}>
        <div className={styles.photo}>
          <Image
            src="/images/business-collaboration.jpg"
            alt="The TUBUDD team collaborating around a table"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <span>Meet TUBUDD</span>
        </div>

        <div className={styles.content}>
          <div className={styles.heading}>
            <h2>Who we <em>are</em></h2>
            <p className={styles.intro}>
              A premier travel-tech platform delivering full-suite travel and relocation services in Vietnam to more than 50,000 clients.
            </p>
          </div>

          <dl className={styles.proof} aria-label="TUBUDD at a glance">
            {proof.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
