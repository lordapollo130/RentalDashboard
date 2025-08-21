"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/config/nav";

export default function Sidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const asideRef = React.useRef<HTMLElement>(null);

  return (
    <aside
      ref={asideRef}
      aria-label="Primary"
      className={[
        "group sticky top-0 h-screen shrink-0 bg-[#1F2643] text-white",
        "w-16 hover:w-56 transition-[width] duration-200 ease-in-out",
        "min-w-0",
        className,
      ].join(" ")}
      onMouseLeave={() => {
        const el = document.activeElement as HTMLElement | null;
        if (el && asideRef.current?.contains(el)) el.blur();
      }}
    >
      <div className="flex h-full flex-col">
        {/* Nav (scrollable) */}
        <nav className="flex-1 overflow-y-auto px-2 py-2" role="navigation">
          <ul className="space-y-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    title={item.name}
                    onClick={(e) => {
                      (e.currentTarget as HTMLAnchorElement).blur();
                    }}
                    className={[
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      "justify-center group-hover:justify-start",
                      "gap-x-0 group-hover:gap-x-3",
                      active
                        ? "bg-[linear-gradient(135deg,#815cfa,#60d8e6)] text-white"
                        : "text-white/80 hover:text-white hover:bg-black/40",
                    ].join(" ")}
                  >
                    <item.icon
                      className={[
                        "h-5 w-5 shrink-0",
                        active ? "text-white" : "text-white/70",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                    <span className="hidden truncate group-hover:inline">
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
