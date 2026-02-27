export type NoteTag = {
  id: string;
  label: string;
  color: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  tags: NoteTag[];
  isPinned: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
};

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  count?: number;
};

export type UserProfile = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  initials: string;
  gradient: [string, string];
};
