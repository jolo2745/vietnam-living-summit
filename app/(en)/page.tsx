import type { Metadata } from "next";
import RelocatePage from "../relocate/RelocatePage";
import { pageMetadata } from "../seo";
import WebsiteStructuredData from "../components/WebsiteStructuredData";
import EventStructuredData from "../components/EventStructuredData";

export const metadata: Metadata = pageMetadata.people.en;

export default function Page() {
  return <><WebsiteStructuredData /><EventStructuredData language="en" /><RelocatePage /></>;
}
