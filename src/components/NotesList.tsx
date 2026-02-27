"use client";

import { useState } from "react";
import { Note } from "@/lib/types";
import { TAGS } from "@/lib/mockData";

type NotesListProps = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (note: Note) => void;
  onDelete: (id: string) => void;
  onNewNote: () => void;
  activeNav: string;
};

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getPreview(content: string): string {
  return content.replace(/\n/g, " ").slice(0, 90).trim() + (content.length > 90 ? "…" : "");
}

const NAV_LABELS: Record<string, string> = {
  all: "All Notes",
  pinned: "Pinned",
  recent: "Recent",
  archived: "Archived",
  trash: "Trash",
};

function getNavLabel(activeNav: string): string {
  if (NAV_LABELS[activeNav]) return NAV_LABELS[activeNav];
  const tag = TAGS.find((t) => t.id === activeNav);
  return tag ? tag.label : "Notes";
}

export default function NotesList({
  notes,
  selectedId,
  onSelect,
  onDelete,
  onNewNote,
  activeNav,
}: NotesListProps) {
  const [query, setQuery] = useState("");

  const visibleNotes = query.trim()
    ? notes.filter((n) => {
        const q = query.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          (n.patientName?.toLowerCase().includes(q) ?? false)
        );
      })
    : notes;

  return (
    <div className="flex flex-col w-[300px] min-h-screen bg-[#EAF5F6] border-r border-[#B8D3D8] flex-shrink-0">
      {/* Header */}
      <div className="px-4 pt-6 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-semibold text-[#103A42]">
            {getNavLabel(activeNav)}
          </h2>
          <button
            onClick={onNewNote}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F7F8E] text-white text-xs font-medium hover:bg-[#0C6F7D] transition-colors shadow-sm shadow-[#0F7F8E]/20"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#3E6770]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search notes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#B8D3D8] rounded-lg text-[#103A42] placeholder-[#7EAAB2] focus:outline-none focus:ring-2 focus:ring-[#0F7F8E]/30 focus:border-[#0F7F8E] transition-all"
          />
        </div>
      </div>

      {/* Sort bar */}
      <div className="px-4 pb-2 flex items-center justify-between">
        <span className="text-[11px] text-[#5E8891] font-medium">
          {visibleNotes.length} note{visibleNotes.length !== 1 ? "s" : ""}
        </span>
        <button className="flex items-center gap-1 text-[11px] text-[#5E8891] hover:text-[#0F7F8E] transition-colors">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          Updated
        </button>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
        {visibleNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center px-6">
            <div className="w-10 h-10 rounded-full bg-[#D9ECEF] flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-[#0F7F8E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#3E6770]">No notes here</p>
            <p className="text-xs text-[#7EAAB2] mt-1">Create your first note to get started</p>
          </div>
        ) : (
          visibleNotes.map((note) => {
            const isSelected = note.id === selectedId;
            return (
              <div
                key={note.id}
                className={`group relative w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-white border-[#0F7F8E]/30 shadow-sm shadow-[#0F7F8E]/10 ring-1 ring-[#0F7F8E]/20"
                    : "bg-white border-[#B8D3D8] hover:border-[#9CC6CC] hover:shadow-sm"
                }`}
                style={note.color ? { backgroundColor: note.color } : undefined}
                onClick={() => onSelect(note)}
              >
                {/* Hover delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note.id);
                  }}
                  title="Delete note"
                  className="absolute top-2.5 right-2.5 p-1 rounded-md opacity-0 group-hover:opacity-100 text-[#7EAAB2] hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

                {/* Title row */}
                <div className="flex items-start gap-2 mb-1.5 pr-5">
                  {note.isPinned && (
                    <svg className="w-3 h-3 mt-0.5 text-[#0F7F8E] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  )}
                  <p className="text-[13px] font-semibold text-[#103A42] leading-snug flex-1 line-clamp-2">
                    {note.title}
                  </p>
                </div>

                {/* Patient name + visit date */}
                {(note.patientName || note.visitDate) && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    {note.patientName && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0F7F8E]/10 border border-[#0F7F8E]/20">
                        <svg className="w-3 h-3 text-[#0F7F8E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-[12px] font-semibold text-[#0F7F8E]">{note.patientName}</span>
                      </div>
                    )}
                    {note.visitDate && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0F7F8E]/10 border border-[#0F7F8E]/20">
                        <svg className="w-3 h-3 text-[#0F7F8E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[12px] font-semibold text-[#0F7F8E]">
                          {note.visitDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Preview */}
                <p className="text-[12px] text-[#3E6770] leading-relaxed line-clamp-2 mb-2.5">
                  {getPreview(note.content)}
                </p>

                {/* Tags */}
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {note.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium"
                        style={{
                          backgroundColor: tag.color + "18",
                          color: tag.color,
                        }}
                      >
                        {tag.label}
                      </span>
                    ))}
                    {note.tags.length > 2 && (
                      <span className="text-[10px] text-[#7EAAB2]">+{note.tags.length - 2}</span>
                    )}
                  </div>
                )}

                {/* Date */}
                <p className="text-[10px] text-[#7EAAB2]">{formatDate(note.updatedAt)}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
