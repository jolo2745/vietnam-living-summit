"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Industries.module.css";

const industries = [
  {
    title: "Immigration & Corporate Law",
    description: "Work permits, company formation, and labour contracts.",
    image: "/images/industries/immigration-law.png",
  },
  {
    title: "Tax & Accounting",
    description: "Personal and corporate tax advisory, plus FDI accounting.",
    image: "/images/industries/tax-accounting.png",
  },
  {
    title: "Marketing Agencies",
    description: "Marketing and media support for expat and FDI businesses.",
    image: "/images/industries/marketing.png",
  },
  {
    title: "HR & Recruitment",
    description: "Local talent hiring and practical labour-law consultation.",
    image: "/images/industries/recruitment.png",
  },
  {
    title: "Banking & Fintech",
    description: "Bank account opening and international money transfers.",
    image: "/images/industries/banking-fintech.png",
  },
  {
    title: "Real Estate & Property Rental",
    description: "Home rentals, property purchasing, and secure lease agreements.",
    image: "/images/industries/real-estate.png",
  },
  {
    title: "International Health Insurance",
    description: "Medical and life-insurance coverage for expats and families.",
    image: "/images/industries/health-insurance.png",
  },
  {
    title: "International Schools",
    description: "K–12 education solutions for international families.",
    image: "/images/industries/schools.png",
  },
  {
    title: "International Hospitals & Clinics",
    description: "World-class healthcare and medical services in Vietnam.",
    image: "/images/industries/hospitals.png",
  },
  {
    title: "Coworking Spaces",
    description: "Flexible workspaces for freelancers, digital nomads, and startups.",
    image: "/images/industries/coworking.png",
  },
  {
    title: "International Relocation & Moving",
    description: "Household moving and international logistics support.",
    image: "/images/industries/relocation-moving.png",
  },
  {
    title: "Car Rental & Chauffeur Services",
    description: "Long-term vehicle rentals and private-driver services.",
    image: "/images/industries/car-chauffeur.png",
  },
  {
    title: "Business Consultancy & Company Setup",
    description: "Business formation and Vietnam market-entry strategy.",
    image: "/images/industries/business-consultancy.png",
  },
  {
    title: "Luxury Resorts & Experiential Travel",
    description: "Premium getaways and curated domestic travel experiences.",
    image: "/images/industries/luxury-travel.png",
  },
];

export function Industries() {
  const gridRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid || !("IntersectionObserver" in window)) {
      return;
    }

    const cards = Array.from(grid.querySelectorAll("li"));
    grid.classList.add(styles.revealReady);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(styles.visible);
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    });

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${styles.industries} wrap`} id="industries">
      <div className={styles.directory}>
        <div className={styles.intro}>
          <h2>Growth solutions for <em>every industry.</em></h2>
          <div className={styles.introCopy}>
            <span>14 service sectors</span>
            <p>One connected alliance bringing the essential services of living, working, and growing in Vietnam under one roof.</p>
          </div>
        </div>

        <ol ref={gridRef} className={styles.grid} aria-label="Industries represented at Vietnam Living Summit 2026">
          {industries.map(({ title, description, image }) => (
            <li key={title}>
              <div className={styles.tileCopy}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <div className={styles.illustration} aria-hidden="true">
                <Image src={image} alt="" fill loading="lazy" sizes="(max-width: 620px) 45vw, (max-width: 1080px) 24vw, 16vw" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
