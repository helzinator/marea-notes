"use client";

import { NavItem, UserProfile } from "@/lib/types";
import BlobDecoration from "./BlobDecoration";

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

      {/* Logo */}
      <div className="relative z-10 px-6 pt-7 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F7F8E] to-[#47B7C2] flex items-center justify-center flex-shrink-0">
            <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span className="text-base font-semibold tracking-tight">marea</span>
            <span className="block text-[10px] text-white/40 leading-none -mt-0.5 tracking-wider uppercase">Notes</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="relative z-10 flex-1 px-3 pt-5 space-y-0.5">
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
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0F7F8E] to-[#47B7C2] flex items-center justify-center text-xs font-semibold flex-shrink-0">
          HC
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">Helena Clifford</p>
          <p className="text-[11px] text-white/40 truncate">helena@usemarea.com</p>
        </div>
        <button className="text-white/30 hover:text-white/70 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
