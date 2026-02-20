"use client";

import dynamic from "next/dynamic";
import { LenisProvider } from "@/lib/lenis-provider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { AtmosphereLayer } from "@/components/motion/AtmosphereLayer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedMenu } from "@/components/sections/FeaturedMenu";
import { SignatureExperience } from "@/components/sections/SignatureExperience";
import { Gallery } from "@/components/sections/Gallery";
import { SoundToggle } from "@/components/sections/SoundToggle";

const CoffeeScene = dynamic(
  () => import("@/components/3d/CoffeeScene").then((m) => ({ default: m.CoffeeScene })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute right-[10%] top-1/2 h-[min(50vh,320px)] w-[min(50vw,320px)] -translate-y-1/2 rounded-2xl bg-[var(--espresso-soft)]/30" />
    ),
  }
);

export default function Home() {
  return (
    <LenisProvider>
      <CustomCursor />
      <AtmosphereLayer />
      <Navbar />
      <main className="relative">
        <Hero />
        {/* <section className="relative min-h-[60vh] bg-[var(--espresso)] py-24">
          <div className="container relative mx-auto px-6 md:px-12">
            <CoffeeScene />
            <div className="relative z-10 max-w-xl pl-0 pt-12 md:pl-[5%] md:pt-0">
              <h2 className="font-editorial text-3xl font-semibold text-[var(--cream)] md:text-4xl">
                A sip of something real
              </h2>
              <p className="mt-4 font-sans text-[var(--cream)]/80">
                Our 3D-roasted beans and slow-barista approach turn every cup into a moment worth staying for.
              </p>
            </div>
          </div>
        </section> */}
        <FeaturedMenu />
        <SignatureExperience />
        <Gallery />
      </main>
      <SoundToggle />
    </LenisProvider>
  );
}
