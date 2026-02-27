"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import UserSelect from "@/components/UserSelect";
import { Note, UserProfile } from "@/lib/types";
import { notesByUser, TAGS } from "@/lib/mockData";

let nextId = 100;

export default function Home() {
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNav, setActiveNav] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectUser = (user: UserProfile) => {
    setActiveUser(user);
    const userNotes = notesByUser[user.id] ?? [];
    setNotes(userNotes);
    const firstNote = userNotes.find((n) => n.isPinned && !n.isArchived) ?? userNotes[0] ?? null;
    setSelectedId(firstNote?.id ?? null);
    setActiveNav("all");
  };

  const handleSwitchUser = () => {
    setActiveUser(null);
    setNotes([]);
    setSelectedId(null);
  };

  const filteredNotes = useMemo(() => {
    switch (activeNav) {
      case "pinned":
        return notes.filter((n) => n.isPinned && !n.isArchived);
      case "recent":
        return [...notes]
          .filter((n) => !n.isArchived)
          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
          .slice(0, 5);
      case "archived":
        return notes.filter((n) => n.isArchived);
      case "trash":
        return [];
      default:
        return notes.filter((n) => !n.isArchived);
    }
  }, [notes, activeNav]);

  const noteCounts = useMemo(
    () => ({
      all: notes.filter((n) => !n.isArchived).length,
      pinned: notes.filter((n) => n.isPinned && !n.isArchived).length,
      recent: Math.min(notes.filter((n) => !n.isArchived).length, 5),
      archived: notes.filter((n) => n.isArchived).length,
      trash: 0,
    }),
    [notes]
  );

  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;

  const handleNewNote = () => {
    const newNote: Note = {
      id: `n${++nextId}`,
      title: "Untitled Note",
      content: "",
      tags: [TAGS[0]],
      isPinned: false,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
    setActiveNav("all");
  };

  const handleUpdate = (updated: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId(null);
  };

  const handleNavChange = (nav: string) => {
    setActiveNav(nav);
    setSelectedId(null);
  };

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
      />
      <NotesList
        notes={filteredNotes}
        selectedId={selectedId}
        onSelect={(note) => setSelectedId(note.id)}
        onDelete={handleDelete}
        onNewNote={handleNewNote}
        activeNav={activeNav}
      />
      <NoteEditor
        key={selectedNote?.id ?? "empty-note"}
        note={selectedNote}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
