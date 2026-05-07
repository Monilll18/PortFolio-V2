"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const text = textRef.current;
    if (!loader || !text) return;

    const tl = gsap.timeline();

    tl.to(text, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    })
      .to(text, {
        opacity: 0.7,
        duration: 0.3,
        delay: 0.3,
      })
      .to(loader, {
        yPercent: -100,
        duration: 0.6,
        ease: "power2.inOut",
        delay: 0.1,
      })
      .set(loader, { display: "none" });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={loaderRef} className="page-loader">
      <div ref={textRef} className="page-loader-text">
        Monil Jain
      </div>
    </div>
  );
}
