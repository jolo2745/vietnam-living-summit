import shared from "../../components/summit/SummitShared.module.css";
import styles from "./PartnershipRoutes.module.css";

const routes = [
  ["Exhibit", "Meet attendees face to face and make your expertise easy to understand."],
  ["Advise", "Host a practical consultation or focused knowledge session in your field."],
  ["Sponsor", "Give your brand a meaningful role in an experience designed around trust."],
  ["Refer", "Join a carefully matched network of providers who solve connected needs."],
];

export function PartnershipRoutes() {
  return (
    <section className={`${styles.partnerships} wrap`}>
      <div className={`${shared.sectionHeading} ${shared.sectionHeadingInline}`}>
        <div>
          <p className={shared.kicker}>Ways to take part</p>
          <h2>Choose the role that<br />fits your <em>business.</em></h2>
        </div>
        <p>We shape partnerships around usefulness. Every presence should add something valuable to the attendee experience.</p>
      </div>
      <div className={styles.list}>
        {routes.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
            <i>↗</i>
          </article>
        ))}
      </div>
    </section>
  );
}
