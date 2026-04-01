// import DigitalAtelier from "@/components/landing-page";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero-section";
import { Navbar } from "@/components/landing/nav-bar";
import { Reviews } from "@/components/landing/reviews";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#fff]">
      <Navbar />
      <Hero />
      <Features/>
      <Reviews/>
      <Footer/>
    </div>
  );
}
