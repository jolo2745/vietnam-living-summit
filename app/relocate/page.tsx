import shared from "../components/summit/SummitShared.module.css";
import { WhoWeAre } from "../components/summit/WhoWeAre";
import { Footer, Header } from "../ui";
import { EventOverview } from "./sections/EventOverview";
import { RelocateHero } from "./sections/RelocateHero";

export default function RelocatePage() {
  return (
    <main className={`${shared.page} ${shared.expatPage}`}>
      <Header active="relocate" />
      <RelocateHero />
      <WhoWeAre tone="people" />
      <EventOverview />
      <Footer />
    </main>
  );
}
