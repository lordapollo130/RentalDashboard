import {
  HomeIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  BriefcaseIcon,
} from "@heroicons/react/20/solid";

export type NavItem = {
  href: string;
  name: string;
  icon: React.ComponentType<any>;
};

export const NAV: NavItem[] = [
  { href: "/dashboard", name: "Dashboard", icon: HomeIcon },
  { href: "/listing", name: "Listing", icon: BuildingOffice2Icon },
  { href: "/messages", name: "Message", icon: ChatBubbleLeftRightIcon },
  { href: "/clients", name: "Clients", icon: UserGroupIcon },
  { href: "/businessSettings", name: "Accounting", icon: BriefcaseIcon },
];

/** Find the matching nav label for a given pathname (supports nested routes). */
export function labelForPath(pathname: string | null | undefined) {
  if (!pathname) return undefined;
  const item = NAV.find(
    (n) => pathname === n.href || pathname.startsWith(n.href + "/")
  );
  return item?.name;
}
