import type { Metadata } from "next";
import RelocatePage from "../../relocate/RelocatePage";
import { pageMetadata } from "../../seo";
import WebsiteStructuredData from "../../components/WebsiteStructuredData";

export const metadata: Metadata = pageMetadata.people.vi;

export default function Page() {
  // Restore event markup once the venue is confirmed.
  return <><WebsiteStructuredData /><RelocatePage /></>;
}
