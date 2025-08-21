"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { labelForPath } from "@/config/nav";

const HIDE_CHROME_ROUTES = ["/login", "/signup"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDE_CHROME_ROUTES.some((p) => pathname?.startsWith(p));

  if (hideChrome) return <>{children}</>;

  // Section label derived from the current route using shared NAV
  const sectionLabel = React.useMemo(() => labelForPath(pathname), [pathname]);

  // Keep your header tabs controlled here (or per page)
  const tabs = ["All Data", "Contact", "Financial", "Management"];
  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  return (
    // Lock to viewport so only main content scrolls
    <div className="fixed inset-0 flex flex-col bg-[#F6F7F9]">
      <Header
        title="SecureStay"
        sectionLabel={sectionLabel}  // shown to the right of title
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSyncClick={() => console.log("sync")}
        onLogoutClick={() => console.log("logout")}
        sticky
      />
      <div className="flex flex-1 overflow-auto -mt-px">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
