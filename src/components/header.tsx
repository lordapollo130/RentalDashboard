"use client";

import React from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

type HeaderProps = {
  title: string;
  /** small label shown to the right of the title (e.g., current section) */
  sectionLabel?: string;
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSyncClick?: () => void;
  syncLabel?: string;
  onLogoutClick?: () => void;
  logoutLabel?: string;
  rightSlot?: React.ReactNode;
  className?: string;
  sticky?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  title,
  sectionLabel,
  tabs,
  activeTab,
  onTabChange,
  onSyncClick = () => {},
  syncLabel = "Sync Reservations",
  onLogoutClick = () => {},
  logoutLabel = "Log out",
  rightSlot,
  className = "",
  sticky = false,
}) => {
  return (
    <header
      className={[
        "flex items-center gap-4 p-4 md:p-2 bg-[#141B37] border-b border-white/10",
        sticky ? "sticky top-0 z-20 -mb-px" : "",
        className,
      ].join(" ")}
    >
      {/* Title + section label */}
      <div className="flex items-center gap-2 shrink-0">
        <h1 className="text-xl md:text-2xl font-bold text-white">{title}</h1>
        {sectionLabel && (
          <span className="inline-flex items-center px-2.5 py-0.5 text-xl md:text-2xl folt-bold text-white/90 ml-20">
            {sectionLabel}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label={`${title} tabs`}
        className="mx-2 flex-1 flex justify-center overflow-x-auto rounded-md"
      >
        <div className="inline-flex bg-[#1f2643] rounded-md">
          {tabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                aria-current={active ? "page" : undefined}
                onClick={() => onTabChange(tab)}
                className={[
                  "px-4 md:px-6 py-2 md:py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  active
                    ? "border-purple-400 text-white bg-[linear-gradient(135deg,#815cfa,#60d8e6)]"
                    : "border-transparent text-gray-300 hover:text-white",
                ].join(" ")}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 shrink-0">
        {rightSlot}
        <button
          type="button"
          onClick={onSyncClick}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-white bg-[linear-gradient(135deg,#9535ee,#6665f1)] hover:opacity-90 active:opacity-100"
        >
          <span>🔄</span>
          <span>{syncLabel}</span>
        </button>
        <button
          type="button"
          onClick={onLogoutClick}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-white bg-[#1f2643] hover:opacity-90 active:opacity-100"
          aria-label={logoutLabel}
          title={logoutLabel}
        >
          <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
          <span className="hidden sm:inline">{logoutLabel}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
