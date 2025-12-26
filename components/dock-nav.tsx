"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, FolderOpen, Terminal, BookOpen, CodeXml } from "lucide-react";

export default function DockNav() {
  const mouseX = useMotionValue(Infinity);
  const isTouchInputRef = useRef(false);
  const [currentHash, setCurrentHash] = React.useState("#home");

  React.useEffect(() => {
    const sections = ["home", "oss", "projects", "about", "blog"];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentHash(`#${entry.target.id}`);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Trigger when element intersects the middle 50% of the viewport
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Update hash on manual click for immediate feedback (optional, but good for UX)
  const handleLinkClick = (hash: string) => {
    setCurrentHash(hash);
    mouseX.set(Infinity);
  };

  return (
    <div className="sticky top-0 z-50 flex justify-center pt-6 pb-4 w-full overflow-x-auto no-scrollbar pointer-events-none">
      <motion.div
        onMouseMove={(e) => {
          if (!isTouchInputRef.current) {
            mouseX.set(e.clientX);
          }
        }}
        onMouseLeave={() => {
          if (!isTouchInputRef.current) {
            mouseX.set(Infinity);
          }
        }}
        onTouchStart={(e) => {
          isTouchInputRef.current = true;
          mouseX.set(e.touches[0].clientX);
        }}
        onTouchMove={(e) => {
          isTouchInputRef.current = true;
          mouseX.set(e.touches[0].clientX);
        }}
        onTouchEnd={() => mouseX.set(Infinity)}
        onTouchCancel={() => mouseX.set(Infinity)}
        className="mx-auto flex h-14 sm:h-16 items-end gap-2 sm:gap-4 rounded-2xl border border-neutral-100 bg-white px-2 sm:px-4 pb-2 sm:pb-3 shadow-xl pointer-events-auto"
      >
        <DockIcon mouseX={mouseX} href="#home" label="Home" isActive={currentHash === "#home"} onClick={() => handleLinkClick("#home")}>
          <Home className="size-5" />
        </DockIcon>
        <DockIcon mouseX={mouseX} href="#oss" label="Open Source" isActive={currentHash === "#oss"} onClick={() => handleLinkClick("#oss")}>
          <Terminal className="size-5" />
        </DockIcon>
        <DockIcon mouseX={mouseX} href="#projects" label="Projects" isActive={currentHash === "#projects"} onClick={() => handleLinkClick("#projects")}>
          <FolderOpen className="size-5" />
        </DockIcon>
        <DockIcon mouseX={mouseX} href="#about" label="About" isActive={currentHash === "#about"} onClick={() => handleLinkClick("#about")}>
          <User className="size-5" />
        </DockIcon>
        <DockIcon mouseX={mouseX} href="#blog" label="Blog" isActive={currentHash === "#blog"} onClick={() => handleLinkClick("#blog")}>
          <BookOpen className="size-5" />
        </DockIcon>

        <div className="h-8 w-[1px] bg-neutral-200 self-center mx-2" />

        <DockIcon mouseX={mouseX} href="https://github.com/s4gor/portfolio" label="Source Code" external onClick={() => mouseX.set(Infinity)}>
          <CodeXml className="size-5" />
        </DockIcon>

        <DockIcon mouseX={mouseX} href="mailto:emran@exeebit.com" label="Hire Me" external onClick={() => mouseX.set(Infinity)}>
          <div className="size-5 flex items-center justify-center">
            <div className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </DockIcon>
      </motion.div>
    </div >
  );
}

function DockIcon({
  mouseX,
  children,
  href,
  label,
  external = false,
  isActive = false,
  onClick,
}: {
  mouseX: MotionValue;
  children: React.ReactNode;
  href: string;
  label: string;
  external?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.5, stiffness: 150, damping: 15 });



  const content = (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "aspect-square w-10 cursor-pointer rounded-full flex items-center justify-center transition-colors border",
        isActive ? "bg-neutral-100 text-neutral-900 border-neutral-100" : "text-neutral-500 border-transparent [@media(hover:hover)]:hover:bg-neutral-100/50 [@media(hover:hover)]:hover:text-neutral-900"
      )}
    >
      <div className="relative">
        {children}
        {isActive && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-800 rounded-full" />
        )}
      </div>
    </motion.div>
  );

  if (external) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="focus:outline-none" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <Link href={href} aria-label={label} className="focus:outline-none" onClick={onClick}>
      {content}
    </Link>
  );
}
