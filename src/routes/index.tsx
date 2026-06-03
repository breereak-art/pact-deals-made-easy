import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import "@/components/pact/fonts";
import { Nav } from "@/components/pact/Nav";
import { VideoHero } from "@/components/pact/VideoHero";
import { OpeningAct } from "@/components/pact/OpeningAct";
import { Marquee } from "@/components/pact/Marquee";
import { Products } from "@/components/pact/Products";
import { BetTypes } from "@/components/pact/BetTypes";
import { Arbitration } from "@/components/pact/Arbitration";
import { Settlements } from "@/components/pact/Settlements";
import { Testimonials } from "@/components/pact/Testimonials";
import { CampusCup } from "@/components/pact/CampusCup";
import { Press } from "@/components/pact/Press";
import { Faq } from "@/components/pact/Faq";
import { GetPact } from "@/components/pact/GetPact";
import { Footer } from "@/components/pact/Footer";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Pact — Talk is cheap. Pact isn’t." },
      {
        name: "description",
        content:
          "Pact holds the stakes, sets the terms, and settles the deal — inside the chat it was made in. Escrow for freelancers, social stakes for the group chat.",
      },
      { property: "og:title", content: "Pact — Talk is cheap. Pact isn’t." },
      {
        property: "og:description",
        content:
          "She holds the money, sets the terms, and settles the deal — without leaving the chat.",
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    track("page_view", { path: "/" });
  }, []);
  return (
    <main className="min-h-screen overflow-x-hidden bg-parchment text-ink font-body selection:bg-ink selection:text-parchment">
      <Nav />
      <VideoHero />
      <OpeningAct />
      <Marquee />
      <Products />
      <BetTypes />
      <Arbitration />
      <Settlements />
      <Testimonials />
      <CampusCup />
      <Press />
      <Faq />
      <GetPact />
      <Footer />
    </main>
  );
}
