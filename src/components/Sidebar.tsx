"use client";

import Image from "next/image";
import { NavItem, UserProfile } from "@/lib/types";
import BlobDecoration from "./BlobDecoration";
import MareaLogo from "@/images/Marea-logo.png";

type SidebarProps = {
  activeNav: string;
  onNavChange: (id: string) => void;
  noteCounts: Record<string, number>;
  user: UserProfile;
  onSwitchUser: () => void;
};

const NAV_ITEMS: NavItem[] = [
  { id: "all", label: "All Notes", icon: "notes" },
  { id: "pinned", label: "Pinned", icon: "pin" },
  { id: "recent", label: "Recent", icon: "clock" },
  { id: "archived", label: "Archived", icon: "archive" },
  { id: "trash", label: "Trash", icon: "trash" },
];

const TAG_ITEMS = [
  { id: "tag-patient", label: "Patient Care", color: "#0F7F8E" },
  { id: "tag-research", label: "Research", color: "#47B7C2" },
  { id: "tag-workflow", label: "Workflow", color: "#2A9AA8" },
  { id: "tag-meeting", label: "Meeting", color: "#5FAFB8" },
];

function NavIcon({ type }: { type: string }) {
  const base = "w-4.5 h-4.5 flex-shrink-0";
  switch (type) {
    case "notes":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "pin":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      );
    case "clock":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "archive":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      );
    case "trash":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ activeNav, onNavChange, noteCounts, user, onSwitchUser }: SidebarProps) {
  return (
    <aside className="relative flex flex-col w-60 min-h-screen bg-[#0E5663] text-white overflow-hidden flex-shrink-0">
      {/* Background blob decorations */}
      <BlobDecoration
        variant="teal"
        size={300}
        className="absolute -top-20 -right-24 opacity-10 pointer-events-none"
      />
      <BlobDecoration
        variant="primary"
        size={260}
        className="absolute -bottom-16 -left-20 opacity-10 pointer-events-none"
      />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 240 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0H240V95C186 64 141 64 98 84C58 101 27 106 0 98V0Z"
          fill="#BCD3D8"
          fillOpacity="0.5"
        />
        <path
          d="M0 92C43 112 89 102 136 82C177 66 209 68 240 84V214H0V92Z"
          fill="#9AC9CF"
          fillOpacity="0.55"
        />
        <path
          d="M0 198C35 220 77 232 126 205C171 180 206 176 240 196V352H0V198Z"
          fill="#76B6BF"
          fillOpacity="0.58"
        />
        <path
          d="M0 330C46 356 90 346 137 322C180 300 212 300 240 320V505H0V330Z"
          fill="#4D9EAA"
          fillOpacity="0.62"
        />
        <path
          d="M0 488C39 510 81 512 125 490C170 468 208 470 240 486V674H0V488Z"
          fill="#1F8D99"
          fillOpacity="0.68"
        />
        <path
          d="M0 660C45 686 90 680 142 652C184 629 215 628 240 642V835H0V660Z"
          fill="#0A7582"
          fillOpacity="0.74"
        />
        <path
          d="M0 818C35 846 82 850 132 832C178 815 214 812 240 822V1000H0V818Z"
          fill="#0A4F5C"
          fillOpacity="0.8"
        />
      </svg>

      {/* Logo */}
      <div className="relative z-10 px-6 pt-2 pb-0 border-b border-white/10 h-[92px] overflow-hidden flex items-start">
        <Image
          src={MareaLogo}
          alt="Marea"
          priority
          className="h-28 w-auto brightness-0 invert -mt-4"
        />
      </div>

      {/* Main nav */}
      <nav className="relative z-10 flex-1 px-3 pt-2 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Library
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/55 hover:text-white/80 hover:bg-white/8"
              }`}
            >
              <NavIcon type={item.icon} />
              <span className="flex-1 text-left">{item.label}</span>
              {noteCounts[item.id] !== undefined && noteCounts[item.id] > 0 && (
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                    isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/50"
                  }`}
                >
                  {noteCounts[item.id]}
                </span>
              )}
            </button>
          );
        })}

        {/* Tags section */}
        <div className="pt-5">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Tags
          </p>
          {TAG_ITEMS.map((tag) => (
            <button
              key={tag.id}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/55 hover:text-white/80 hover:bg-white/8 transition-all"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: tag.color }}
              />
              {tag.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Stats card */}
      <div className="relative z-10 mx-3 mb-3 p-3.5 rounded-xl bg-white/8 border border-white/10">
        <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">This month</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-semibold text-white">{noteCounts.all}</p>
            <p className="text-[11px] text-white/50">total notes</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#47B7C2]">{noteCounts.pinned}</p>
            <p className="text-[11px] text-white/50">pinned</p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="relative z-10 px-4 py-4 border-t border-white/10 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${user.gradient[0]}, ${user.gradient[1]})` }}
        >
          {user.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{user.name}</p>
          <p className="text-[11px] text-white/40 truncate">{user.role}</p>
        </div>
        <button
          onClick={onSwitchUser}
          title="Switch user"
          className="text-white/30 hover:text-white/70 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
