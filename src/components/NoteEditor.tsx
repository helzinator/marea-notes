"use client";

import { useState } from "react";
import { Note } from "@/lib/types";
import BlobDecoration from "./BlobDecoration";

type NoteEditorProps = {
  note: Note | null;
  onUpdate: (updated: Note) => void;
  onDelete: (id: string) => void;
};

function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function wordCount(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function DeleteConfirmDialog({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0E5663]/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-xl shadow-[#103A42]/15 w-full max-w-sm mx-4 p-6 border border-[#B8D3D8]">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#103A42] mb-1">Delete note?</h3>
            <p className="text-sm text-[#3E6770] leading-relaxed">
              <span className="font-medium text-[#103A42]">&ldquo;{title}&rdquo;</span> will be permanently deleted. This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-[#3E6770] hover:text-[#103A42] bg-[#EAF5F6] hover:bg-[#D9ECEF] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-sm shadow-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NoteEditor({ note, onUpdate, onDelete }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [patientName, setPatientName] = useState(note?.patientName ?? "");
  const [visitDate, setVisitDate] = useState(
    note?.visitDate ? note.visitDate.toISOString().slice(0, 10) : ""
  );
  const [content, setContent] = useState(note?.content ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!note) {
    return (
      <div className="relative flex-1 flex flex-col items-center justify-center bg-[#EAF5F6] overflow-hidden">
        <BlobDecoration
          variant="light"
          size={500}
          className="absolute top-[-80px] right-[-120px] opacity-60 pointer-events-none"
        />
        <BlobDecoration
          variant="teal"
          size={350}
          className="absolute bottom-[-60px] left-[-80px] opacity-10 pointer-events-none"
        />
        <div className="relative z-10 text-center px-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F7F8E] to-[#47B7C2] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#0F7F8E]/20">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#103A42] mb-2">Select a note</h3>
          <p className="text-sm text-[#3E6770] max-w-xs leading-relaxed">
            Choose a note from the list to view or edit it, or create a new one to get started.
          </p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onUpdate({
      ...note,
      title,
      patientName: patientName || undefined,
      visitDate: visitDate ? new Date(visitDate) : undefined,
      content,
      updatedAt: new Date(),
    });
    setIsEditing(false);
  };

  const handleTogglePin = () => {
    onUpdate({ ...note, isPinned: !note.isPinned, updatedAt: new Date() });
  };

  const handleArchive = () => {
    onUpdate({ ...note, isArchived: !note.isArchived, updatedAt: new Date() });
  };

  return (
    <>
      {showDeleteConfirm && (
        <DeleteConfirmDialog
          title={note.title}
          onConfirm={() => onDelete(note.id)}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      <div className="relative flex-1 flex flex-col bg-white overflow-hidden">
        {/* Subtle blob decoration */}
        <BlobDecoration
          variant="light"
          size={420}
          className="absolute top-[-60px] right-[-100px] opacity-40 pointer-events-none"
        />

        {/* Toolbar */}
        <div className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-[#B8D3D8]">
          <div className="flex items-center gap-2">
            {/* Pin */}
            <button
              onClick={handleTogglePin}
              title={note.isPinned ? "Unpin" : "Pin"}
              className={`p-2 rounded-lg transition-all ${
                note.isPinned
                  ? "bg-[#D9ECEF] text-[#0F7F8E]"
                  : "text-[#7EAAB2] hover:bg-[#E2F1F3] hover:text-[#0F7F8E]"
              }`}
            >
              <svg className="w-4 h-4" fill={note.isPinned ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>

            {/* Archive */}
            <button
              onClick={handleArchive}
              title={note.isArchived ? "Unarchive" : "Archive"}
              className={`p-2 rounded-lg transition-all ${
                note.isArchived
                  ? "bg-[#D9ECEF] text-[#0F7F8E]"
                  : "text-[#7EAAB2] hover:bg-[#E2F1F3] hover:text-[#3E6770]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </button>

            {/* Share */}
            <button
              title="Share"
              className="p-2 rounded-lg text-[#7EAAB2] hover:bg-[#E2F1F3] hover:text-[#3E6770] transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    setTitle(note.title);
                    setPatientName(note.patientName ?? "");
                    setVisitDate(note.visitDate ? note.visitDate.toISOString().slice(0, 10) : "");
                    setContent(note.content);
                    setIsEditing(false);
                  }}
                  className="px-3.5 py-1.5 text-sm text-[#3E6770] hover:text-[#103A42] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0F7F8E] text-white text-sm font-medium rounded-lg hover:bg-[#0C6F7D] transition-colors shadow-sm shadow-[#0F7F8E]/20"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#E2F1F3] text-[#0F7F8E] text-sm font-medium rounded-lg hover:bg-[#D9ECEF] transition-colors border border-[#C4E2E7]"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-lg text-[#7EAAB2] hover:bg-red-50 hover:text-red-500 transition-all"
              title="Delete note"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="relative z-10 flex-1 overflow-y-auto px-8 py-6">
          {/* Tags */}
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium"
                  style={{
                    backgroundColor: tag.color + "18",
                    color: tag.color,
                    border: `1px solid ${tag.color}30`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tag.color }} />
                  {tag.label}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-bold text-[#103A42] bg-transparent border-none outline-none focus:outline-none mb-1 placeholder-[#9FC2C8]"
              placeholder="Note title…"
              autoFocus
            />
          ) : (
            <h1 className="text-2xl font-bold text-[#103A42] mb-1 leading-snug">{note.title}</h1>
          )}

          {/* Meta */}
          <p className="text-xs text-[#7EAAB2] mb-6">
            Last updated {formatFullDate(note.updatedAt)}
          </p>

          {/* Patient name */}
          <div className="flex items-center gap-2.5 mb-6">
            <svg className="w-4 h-4 text-[#7EAAB2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {isEditing ? (
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Patient name…"
                className="flex-1 text-sm text-[#2F5962] bg-[#EAF5F6] border border-[#B8D3D8] rounded-lg px-3 py-1.5 outline-none focus:border-[#0F7F8E] focus:ring-1 focus:ring-[#0F7F8E]/20 placeholder-[#9FC2C8] transition-colors"
              />
            ) : (
              <span className={`text-sm ${note.patientName ? "text-[#2F5962] font-medium" : "text-[#9FC2C8] italic"}`}>
                {note.patientName || "No patient assigned"}
              </span>
            )}
          </div>

          {/* Visit date */}
          <div className="flex items-center gap-2.5 mb-6">
            <svg className="w-4 h-4 text-[#7EAAB2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {isEditing ? (
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="text-sm text-[#2F5962] bg-[#EAF5F6] border border-[#B8D3D8] rounded-lg px-3 py-1.5 outline-none focus:border-[#0F7F8E] focus:ring-1 focus:ring-[#0F7F8E]/20 transition-colors"
              />
            ) : (
              <span className={`text-sm ${note.visitDate ? "text-[#2F5962] font-medium" : "text-[#9FC2C8] italic"}`}>
                {note.visitDate
                  ? note.visitDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                  : "No visit date set"}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#B8D3D8] via-[#C4E2E7] to-transparent mb-6" />

          {/* Body */}
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[340px] text-sm text-[#2F5962] bg-transparent border-none outline-none focus:outline-none resize-none leading-7 placeholder-[#9FC2C8]"
              placeholder="Start writing your note…"
            />
          ) : (
            <div className="text-sm text-[#2F5962] leading-7 whitespace-pre-wrap">
              {note.content}
            </div>
          )}
        </div>

        {/* Footer meta */}
        <div className="relative z-10 px-8 py-3 border-t border-[#B8D3D8] flex items-center justify-between">
          <p className="text-[11px] text-[#7EAAB2]">
            Created {formatFullDate(note.createdAt)}
          </p>
          <p className="text-[11px] text-[#7EAAB2]">
            {wordCount(isEditing ? content : note.content)} words
          </p>
        </div>
      </div>
    </>
  );
}
