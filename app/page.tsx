// import DigitalAtelier from "@/components/landing-page";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero-section";
import { Navbar } from "@/components/landing/nav-bar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#fff]">
      <Navbar />
      <Hero />
      <Features/>
    </div>
  );
}
