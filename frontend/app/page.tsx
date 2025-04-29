"use client";
import FeatureSection from "@/components/features";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero";
import NavBar from "@/components/nav";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <FeatureSection />
      <FooterSection />
    </main>
  );
}
