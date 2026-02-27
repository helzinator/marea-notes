"use client";

import { UserProfile } from "@/lib/types";
import { USERS } from "@/lib/mockData";
import BlobDecoration from "./BlobDecoration";

type UserSelectProps = {
  onSelect: (user: UserProfile) => void;
};

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const ROLE_ICONS: Record<string, JSX.Element> = {
  Dentist: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  ),
  "Dental Hygienist": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  "Office Manager": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  Orthodontist: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
};

export default function UserSelect({ onSelect }: UserSelectProps) {
  return (
    <div className="relative min-h-screen bg-[#EAF5F6] flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Blob decorations */}
      <BlobDecoration
        variant="primary"
        size={600}
        className="absolute -top-32 -right-40 opacity-15 pointer-events-none"
      />
      <BlobDecoration
        variant="teal"
        size={480}
        className="absolute -bottom-24 -left-32 opacity-10 pointer-events-none"
      />
      <BlobDecoration
        variant="light"
        size={320}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 opacity-30 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0E5663] to-[#47B7C2] flex items-center justify-center shadow-md shadow-[#0F7F8E]/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-[#0E5663] tracking-tight">marea</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#103A42] mb-2">
            {greeting()}
          </h1>
          <p className="text-[#3E6770] text-sm">
            Select your profile to continue to your notes
          </p>
        </div>

        {/* User cards */}
        <div className="grid grid-cols-2 gap-4">
          {USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelect(user)}
              className="group relative bg-white rounded-2xl border border-[#B8D3D8] p-5 text-left hover:border-[#0F7F8E]/40 hover:shadow-lg hover:shadow-[#0F7F8E]/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Subtle inner gradient on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0F7F8E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${user.gradient[0]}, ${user.gradient[1]})`,
                  }}
                >
                  {user.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-[15px] font-semibold text-[#103A42] leading-snug mb-0.5">
                    {user.name}
                  </p>
                  <p className="text-[13px] text-[#0F7F8E] font-medium mb-1">
                    {user.role}
                  </p>
                  <p className="text-[11px] text-[#7EAAB2]">{user.specialty}</p>
                </div>
              </div>

              {/* Role icon + arrow row */}
              <div className="relative flex items-center justify-between mt-4 pt-3.5 border-t border-[#EAF5F6]">
                <span
                  className="flex items-center gap-1.5 text-[11px] font-medium"
                  style={{ color: user.gradient[1] }}
                >
                  {ROLE_ICONS[user.role]}
                  {user.specialty}
                </span>
                <svg
                  className="w-4 h-4 text-[#B8D3D8] group-hover:text-[#0F7F8E] group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-[#7EAAB2] mt-8">
          Not you?{" "}
          <button className="text-[#0F7F8E] hover:text-[#0E5663] font-medium underline underline-offset-2 transition-colors">
            Sign in with a different account
          </button>
        </p>
      </div>
    </div>
  );
}
