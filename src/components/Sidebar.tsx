"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NavItem, NoteTag, UserProfile } from "@/lib/types";
import MareaLogo from "@/images/Marea-logo.png";

type SidebarProps = {
  activeNav: string;
  onNavChange: (id: string) => void;
  noteCounts: Record<string, number>;
  user: UserProfile;
  onSwitchUser: () => void;
  onNewNote: () => void;
  tags: NoteTag[];
  onDeleteTag: (id: string) => void;
  onReorderTags: (tags: NoteTag[]) => void;
};

const NAV_ITEMS: NavItem[] = [
  { id: "all", label: "All Notes", icon: "notes" },
  { id: "pinned", label: "Pinned", icon: "pin" },
  { id: "recent", label: "Recent", icon: "clock" },
  { id: "archived", label: "Archived", icon: "archive" },
  { id: "trash", label: "Trash", icon: "trash" },
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

export default function Sidebar({
  activeNav,
  onNavChange,
  noteCounts,
  user,
  onSwitchUser,
  onNewNote,
  tags,
  onDeleteTag,
  onReorderTags,
}: SidebarProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ tagId: string; x: number; y: number } | null>(null);

  useEffect(() => {
    if (!contextMenu) return;
    const close = () => setContextMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [contextMenu]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (id !== draggedId) setDragOverId(id);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;
    const newTags = [...tags];
    const fromIdx = newTags.findIndex((t) => t.id === draggedId);
    const toIdx = newTags.findIndex((t) => t.id === targetId);
    const [moved] = newTags.splice(fromIdx, 1);
    newTags.splice(toIdx, 0, moved);
    onReorderTags(newTags);
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  return (
    <>
      {/* Context menu portal */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-lg border border-[#B8D3D8] py-1 min-w-[140px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              onDeleteTag(contextMenu.tagId);
              setContextMenu(null);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete tag
          </button>
        </div>
      )}

      <aside className="relative flex flex-col w-60 h-screen text-white overflow-hidden flex-shrink-0">
        {/* Wave background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 240 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect width="240" height="900" fill="#C5E3E8" />
          <path d="M0,138 C80,110 160,166 240,138 L240,900 L0,900 Z" fill="#8ECDD4" />
          <path d="M0,276 C80,248 160,304 240,276 L240,900 L0,900 Z" fill="#50AEB9" />
          <path d="M0,414 C80,386 160,442 240,414 L240,900 L0,900 Z" fill="#2C8E9C" />
          <path d="M0,552 C80,524 160,580 240,552 L240,900 L0,900 Z" fill="#1A6E7B" />
          <path d="M0,690 C80,662 160,718 240,690 L240,900 L0,900 Z" fill="#0F5260" />
          <path d="M0,828 C80,800 160,856 240,828 L240,900 L0,900 Z" fill="#082430" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A3840]/68 via-[#0A3840]/48 to-[#0A3840]/08 pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 px-5 border-b border-white/10 h-[76px] overflow-hidden flex items-center">
          <Image src={MareaLogo} alt="Marea" priority className="h-16 w-auto brightness-0 invert" />
        </div>

        {/* Main nav */}
        <nav className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 pt-3 space-y-0.5">
          <button
            onClick={onNewNote}
            className="w-full flex items-center gap-2 px-3 py-2 mb-3 rounded-lg bg-white/15 hover:bg-white/22 text-white text-sm font-medium transition-all border border-white/20"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </button>

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
          {tags.length > 0 && (
            <div className="pt-5">
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                Tags
              </p>
              {tags.map((tag) => {
                const isActive = activeNav === tag.id;
                const isDragging = draggedId === tag.id;
                const isDragOver = dragOverId === tag.id;
                return (
                  <div
                    key={tag.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, tag.id)}
                    onDragOver={(e) => handleDragOver(e, tag.id)}
                    onDrop={(e) => handleDrop(e, tag.id)}
                    onDragEnd={handleDragEnd}
                    className={`rounded-lg transition-all ${isDragOver ? "ring-1 ring-white/30 bg-white/5" : ""}`}
                  >
                    <button
                      onClick={() => onNavChange(tag.id)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setContextMenu({ tagId: tag.id, x: e.clientX, y: e.clientY });
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all cursor-grab active:cursor-grabbing ${
                        isDragging ? "opacity-40" : ""
                      } ${
                        isActive
                          ? "bg-white/15 text-white font-medium"
                          : "text-white/55 hover:text-white/80 hover:bg-white/8"
                      }`}
                    >
                      <svg className="w-3 h-3 text-white/25 flex-shrink-0" fill="none" viewBox="0 0 10 16" stroke="currentColor" strokeWidth={1.5}>
                        <circle cx="3" cy="3" r="1" fill="currentColor" stroke="none" />
                        <circle cx="7" cy="3" r="1" fill="currentColor" stroke="none" />
                        <circle cx="3" cy="8" r="1" fill="currentColor" stroke="none" />
                        <circle cx="7" cy="8" r="1" fill="currentColor" stroke="none" />
                        <circle cx="3" cy="13" r="1" fill="currentColor" stroke="none" />
                        <circle cx="7" cy="13" r="1" fill="currentColor" stroke="none" />
                      </svg>
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: tag.color }} />
                      <span className="flex-1 text-left">{tag.label}</span>
                      {noteCounts[tag.id] !== undefined && noteCounts[tag.id] > 0 && (
                        <span
                          className={`text-[11px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                            isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/50"
                          }`}
                        >
                          {noteCounts[tag.id]}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
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
    </>
  );
}
