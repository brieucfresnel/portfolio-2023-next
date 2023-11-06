"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const LenisScroller = () => {
  const lenis = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true });
  }, [pathname, searchParams, lenis]);

  useEffect(() => {
    lenis.current = new Lenis();

    lenis.current.on("scroll", (e) => {
    });

    function raf(time) {
      lenis.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.current.destroy();
      lenis.current = null;
    };
  }, []);
  return <></>;
};
