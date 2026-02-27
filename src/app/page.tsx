"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import UserSelect from "@/components/UserSelect";
import { Note, NoteTag, UserProfile } from "@/lib/types";
import { notesByUser, TAGS } from "@/lib/mockData";

let nextId = 100;

export default function Home() {
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<NoteTag[]>(TAGS);
  const [activeNav, setActiveNav] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openInEditMode, setOpenInEditMode] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const handleSelectUser = (user: UserProfile) => {
    setIsLoadingUser(true);
    setTimeout(() => {
      setActiveUser(user);
      const userNotes = notesByUser[user.id] ?? [];
      setNotes(userNotes);
      const firstNote = userNotes.find((n) => n.isPinned && !n.isArchived) ?? userNotes[0] ?? null;
      setSelectedId(firstNote?.id ?? null);
      setActiveNav("all");
      setIsLoadingUser(false);
    }, 400);
  };

  const handleSwitchUser = () => {
    setActiveUser(null);
    setNotes([]);
    setSelectedId(null);
    setTags(TAGS);
  };

  const tagIds = useMemo(() => new Set(tags.map((t) => t.id)), [tags]);

  const filteredNotes = useMemo(() => {
    switch (activeNav) {
      case "pinned":
        return notes.filter((n) => n.isPinned && !n.isArchived && !n.isTrashed);
      case "recent":
        return [...notes]
          .filter((n) => !n.isArchived && !n.isTrashed)
          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
          .slice(0, 5);
      case "archived":
        return notes.filter((n) => n.isArchived && !n.isTrashed);
      case "trash":
        return notes.filter((n) => n.isTrashed);
      default:
        if (tagIds.has(activeNav)) {
          return notes.filter((n) => !n.isArchived && !n.isTrashed && n.tags.some((t) => t.id === activeNav));
        }
        return notes.filter((n) => !n.isArchived && !n.isTrashed);
    }
  }, [notes, activeNav, tagIds]);

  const noteCounts = useMemo(() => {
    const tagCounts = Object.fromEntries(
      tags.map((tag) => [
        tag.id,
        notes.filter((n) => !n.isArchived && !n.isTrashed && n.tags.some((t) => t.id === tag.id)).length,
      ])
    );
    return {
      all: notes.filter((n) => !n.isArchived && !n.isTrashed).length,
      pinned: notes.filter((n) => n.isPinned && !n.isArchived && !n.isTrashed).length,
      recent: Math.min(notes.filter((n) => !n.isArchived && !n.isTrashed).length, 5),
      archived: notes.filter((n) => n.isArchived && !n.isTrashed).length,
      trash: notes.filter((n) => n.isTrashed).length,
      ...tagCounts,
    };
  }, [notes, tags]);

  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;

  const handleNewNote = () => {
    const newNote: Note = {
      id: `n${++nextId}`,
      title: "Untitled Note",
      content: "",
      tags: tags.length > 0 ? [tags[0]] : [],
      isPinned: false,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
    setActiveNav("all");
    setOpenInEditMode(true);
  };

  const handleUpdate = (updated: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  // Moves note to trash; if already trashed, permanently deletes
  const handleDelete = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note?.isTrashed) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } else {
      setNotes((prev) =>
        prev.map((n) => n.id === id ? { ...n, isTrashed: true, isPinned: false } : n)
      );
    }
    setSelectedId(null);
  };

  const handleRestore = (id: string) => {
    setNotes((prev) => prev.map((n) => n.id === id ? { ...n, isTrashed: false } : n));
  };

  const handleNavChange = (nav: string) => {
    setActiveNav(nav);
    setSelectedId(null);
  };

  const handleDeleteTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    setNotes((prev) => prev.map((n) => ({ ...n, tags: n.tags.filter((t) => t.id !== id) })));
    if (activeNav === id) setActiveNav("all");
  };

  const handleReorderTags = (newTags: NoteTag[]) => setTags(newTags);

  if (isLoadingUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#EAF5F6]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#0F7F8E] border-t-transparent animate-spin" />
          <p className="text-sm text-[#3E6770]">Loading notes…</p>
        </div>
      </div>
    );
  }

  if (!activeUser) {
    return <UserSelect onSelect={handleSelectUser} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeNav={activeNav}
        onNavChange={handleNavChange}
        noteCounts={noteCounts}
        user={activeUser}
        onSwitchUser={handleSwitchUser}
        onNewNote={handleNewNote}
        tags={tags}
        onDeleteTag={handleDeleteTag}
        onReorderTags={handleReorderTags}
      />
      <NotesList
        notes={filteredNotes}
        selectedId={selectedId}
        onSelect={(note) => { setSelectedId(note.id); setOpenInEditMode(false); }}
        onDelete={handleDelete}
        onNewNote={handleNewNote}
        activeNav={activeNav}
        tags={tags}
      />
      <NoteEditor
        key={selectedNote?.id ?? "empty-note"}
        note={selectedNote}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onRestore={handleRestore}
        defaultEditing={openInEditMode}
        availableTags={tags}
      />
    </div>
  );
}
