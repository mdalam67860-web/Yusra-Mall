"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Menu,
  ShoppingBag,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import * as React from "react";
import MetroHero from "@/components/ui/scroll-locked-video-hero";

const categories = [
  {
    title: "FASHION",
    text: "Discover the latest looks, timeless essentials and statement pieces.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "DINING",
    text: "From quick bites to unforgettable evenings, find your next table.",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "LIFESTYLE",
    text: "Beauty, home, technology and everything that makes life better.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1400&q=85",
  },
];

const events = [
  { date: "18 OCT", title: "Autumn Style Week", type: "FASHION" },
  { date: "26 OCT", title: "Taste of Yusra", type: "DINING" },
  { date: "02 NOV", title: "Live at the Atrium", type: "EXPERIENCE" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <main className="bg-[#f5f2ec] text-[#111]">
      <MetroHero title="YUSRA MALL" tagline="Where shopping meets experience." signature={false} />

      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f5f2ec]/90 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="text-sm font-black tracking-[0.25em]">YUSRA</a>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] md:flex">
            <a href="#discover" className="hover:opacity-50">Discover</a>
            <a href="#stores" className="hover:opacity-50">Stores</a>
            <a href="#events" className="hover:opacity-50">Events</a>
            <a href="#visit" className="hover:opacity-50">Visit</a>
          </nav>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-black/15 p-2 md:hidden"
            aria-label="Open menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mx-auto flex max-w-7xl flex-col gap-5 py-6 text-xs font-semibold uppercase tracking-[0.2em] md:hidden">
            <a href="#discover" onClick={() => setMenuOpen(false)}>Discover</a>
            <a href="#stores" onClick={() => setMenuOpen(false)}>Stores</a>
            <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
            <a href="#visit" onClick={() => setMenuOpen(false)}>Visit</a>
          </nav>
        )}
      </header>

      <section id="discover" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-end">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">THE YUSRA EXPERIENCE</p>
            <h2 className="max-w-2xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">
              MORE THAN A MALL.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-black/60">
            A place to wander, meet, discover and stay a little longer. Yusra Mall brings fashion, food, culture and everyday moments together under one roof.
          </p>
        </div>
      </section>

      <section id="stores" className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {categories.map((item) => (
            <article key={item.title} className="group overflow-hidden bg-white">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-5 left-5 text-3xl font-black tracking-[-0.04em] text-white">{item.title}</h3>
              </div>
              <div className="flex min-h-32 items-end justify-between gap-4 p-5">
                <p className="text-sm leading-6 text-black/55">{item.text}</p>
                <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#111] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-white/45">EVERYDAY ESSENTIALS</p>
            <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">YOUR DAY,<br />YOUR WAY.</h2>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/15">
            {[
              [ShoppingBag, "SHOP", "Curated stores"],
              [Utensils, "DINE", "Restaurants & cafés"],
              [Sparkles, "EXPERIENCE", "Things to do"],
              [CalendarDays, "EVENTS", "What's on"],
            ].map(([Icon, label, text]) => (
              <div key={label as string} className="bg-[#111] p-6 sm:p-8">
                <Icon size={22} strokeWidth={1.5} />
                <p className="mt-12 text-xs font-bold tracking-[0.25em]">{label as string}</p>
                <p className="mt-2 text-sm text-white/45">{text as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between border-b border-black/15 pb-6">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">WHAT'S ON</p>
              <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-6xl">UP NEXT.</h2>
            </div>
            <CalendarDays className="hidden sm:block" />
          </div>
          <div>
            {events.map((event) => (
              <article key={event.title} className="group grid grid-cols-[90px_1fr_auto] items-center gap-5 border-b border-black/10 py-7 sm:grid-cols-[120px_1fr_150px_auto]">
                <span className="text-sm font-bold">{event.date}</span>
                <h3 className="text-xl font-bold sm:text-2xl">{event.title}</h3>
                <span className="hidden text-[10px] font-bold tracking-[0.25em] text-black/40 sm:block">{event.type}</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="bg-[#d9d3c8] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">PLAN YOUR VISIT</p>
            <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">COME<br />FIND US.</h2>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex gap-4">
              <MapPin className="mt-1 shrink-0" />
              <div>
                <p className="font-bold">Yusra Mall</p>
                <p className="mt-2 text-sm leading-6 text-black/55">Your city destination for shopping, dining and experiences.</p>
              </div>
            </div>
            <div className="mt-12">
              <button className="inline-flex items-center gap-3 rounded-full bg-[#111] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:scale-[1.02]">
                Get Directions <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#111] px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-b border-white/15 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-2xl font-black tracking-[-0.04em]">YUSRA MALL</p>
            <p className="mt-2 text-xs text-white/40">Where shopping meets experience.</p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">© 2026 Yusra Mall</p>
        </div>
      </footer>
    </main>
  );
}
