import shared from "../components/summit/SummitShared.module.css";
import { WhoWeAre } from "../components/summit/WhoWeAre";
import { Footer, Header } from "../ui";
import { Industries } from "./sections/Industries";
import { PartnerBenefits } from "./sections/PartnerBenefits";
import { PartnerHero } from "./sections/PartnerHero";
import { PartnerLevels } from "./sections/PartnerLevels";

export default function PartnersPage() {
  return (
    <main className={`${shared.page} ${shared.partnerPage}`}>
      <Header active="partners" />
      <PartnerHero />
      <WhoWeAre tone="business" />
      <PartnerBenefits />
      <Industries />
      <PartnerLevels />
      <Footer />
    </main>
  );
}
