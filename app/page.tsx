import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="gateway">
      <section className="audience-panel people-panel">
        <Image
          src="/images/vietnam-relocation-hero.png"
          alt="A couple beginning their new life in Ho Chi Minh City"
          fill
          priority
          sizes="(max-width: 800px) 100vw, 50vw"
          className="panel-image"
        />
        <div className="panel-shade" />
        <div className="panel-content">
          <p className="audience-label"><span>For people</span> Individuals · Families · Professionals</p>
          <h1>Build your life<br /><em>in Vietnam.</em></h1>
          <p>Personal, on-the-ground support from planning your move to feeling properly at home.</p>
          <Link href="/relocate" className="arrow-link">Plan your move <span>↗</span></Link>
        </div>
      </section>

      <section className="audience-panel partner-panel">
        <Image
          src="/images/vietnam-blue-hour.png"
          alt="A business professional arriving in Ho Chi Minh City"
          fill
          priority
          sizes="(max-width: 800px) 100vw, 50vw"
          className="panel-image"
        />
        <div className="panel-shade partner-shade" />
        <div className="grid-lines" aria-hidden="true" />
        <div className="panel-content">
          <p className="audience-label"><span>For business</span> Partners · Providers · Employers</p>
          <h2>Let your business help<br /><em>build the community.</em></h2>
          <p>Join our trusted local network, support people settling in to Vietnam, and be recommended when your service is the right fit.</p>
          <Link href="/partners" className="arrow-link">Join the community <span>↗</span></Link>
        </div>
      </section>

    </main>
  );
}
