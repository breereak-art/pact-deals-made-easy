import { createFileRoute } from "@tanstack/react-router";
import "@/components/pact/fonts";
import { Nav } from "@/components/pact/Nav";
import { Hero } from "@/components/pact/Hero";
import { Marquee } from "@/components/pact/Marquee";
import { Products } from "@/components/pact/Products";
import { BetTypes } from "@/components/pact/BetTypes";
import { Arbitration } from "@/components/pact/Arbitration";
import { Settlements } from "@/components/pact/Settlements";
import { CampusCup } from "@/components/pact/CampusCup";
import { Footer } from "@/components/pact/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Pact — The trust layer for messaging" },
      {
        name: "description",
        content:
          "Pact locks money, sets conditions, and releases payment automatically inside the chat. Escrow for freelancers, social predictions for campus.",
      },
      { property: "og:title", content: "Pact — Deals made in chat. Deals that get done." },
      {
        property: "og:description",
        content:
          "Escrow for freelancers. Social predictions for students. Secured in the DMs, settled on Pact.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-parchment text-ink font-body selection:bg-lavender/40">
      <Nav />
      <Hero />
      <Marquee />
      <Products />
      <BetTypes />
      <Arbitration />
      <Settlements />
      <CampusCup />
      <Footer />
    </main>
  );
}
