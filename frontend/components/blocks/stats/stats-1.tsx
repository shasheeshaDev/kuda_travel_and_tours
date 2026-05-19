"use client";

import { useEffect, useRef, useState } from "react";
import { PAGE_QUERYResult } from "@/sanity.types";

type Stats1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "stats-1" }
>;

function useCountUp(target: number, duration = 1600, triggered: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(frame);
      else setCount(target);
    };
    requestAnimationFrame(frame);
  }, [triggered, target, duration]);
  return count;
}

function parseStatValue(raw: string): { numeric: number; suffix: string } {
  const match = raw.match(/^([\d.]+)(.*)$/);
  if (!match) return { numeric: 0, suffix: raw };
  return { numeric: parseFloat(match[1]), suffix: match[2] };
}

function StatCard({ value, label, triggered }: { value: string; label: string; triggered: boolean }) {
  const { numeric, suffix } = parseStatValue(value);
  const count = useCountUp(numeric, 1600, triggered);
  return (
    <div className="bg-white/[0.06] border border-white/10 rounded-[14px] px-6 py-7">
      <div className="text-[38px] font-extrabold text-white tracking-[-0.02em] mb-[6px] leading-none">
        {triggered ? count : 0}{suffix}
      </div>
      <div className="text-[14px] text-white/55 leading-[1.5]">{label}</div>
    </div>
  );
}

export default function Stats1({ headline, stats }: Stats1Props) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} className="bg-brand-dark py-[72px] max-lg:py-14 max-sm:py-12">
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4">
        {headline && (
          <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold text-white tracking-[-0.02em] text-center mb-[52px] leading-[1.2] max-lg:mb-9 max-sm:mb-7">
            {headline}
          </h2>
        )}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-sm:gap-[10px]">
            {stats.map((stat) => (
              <StatCard key={stat._key} value={stat.value || ""} label={stat.label || ""} triggered={triggered} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
