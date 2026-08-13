import Image from "next/image";
import shared from "../../components/summit/SummitShared.module.css";
import styles from "./PartnerHero.module.css";

export function PartnerHero() {
  return (
    <section className={`${styles.hero} wrap`}>
      <div className={styles.copy}>
        <h1>Vietnam Living<br /><em>Summit 2026.</em></h1>
        <p className={styles.lede}>Meet newcomers, build relationships with businesses and potential clients and help create a community Vietnam can be proud of.</p>
        <div className={styles.actions}>
          <a className={shared.button} href="mailto:hello@meetannie.co?subject=Vietnam%20Living%20Summit%20Partnership">Become a partner <span>↗</span></a>
          <a className={shared.textLink} href="#partner-benefits">See the opportunity <span>↓</span></a>
        </div>
        <dl className={styles.quickFacts}>
          <div><dt>Audience</dt><dd>100+ high-intent clients</dd></div>
          <div><dt>Format</dt><dd>Summit + partner gathering</dd></div>
        </dl>
      </div>

      <div className={styles.visual}>
        <div className={styles.photo}>
          <Image
            src="/images/business-collaboration.jpg"
            alt="A collaborative team working together in a modern office"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 47vw"
          />
        </div>
        <div className={styles.poster} aria-label="Partner opportunity summary">
          <span className={styles.posterLabel}>Direct access</span>
          <strong>100+</strong>
          <p>International clients<br />to connect with</p>
        </div>
        <div className={styles.stamp} aria-hidden="true">BUILD<br />TOGETHER</div>
      </div>
    </section>
  );
}
