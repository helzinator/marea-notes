"use client";

import Image from "next/image";
import { UserProfile } from "@/lib/types";
import { USERS } from "@/lib/mockData";
import BlobDecoration from "./BlobDecoration";
import MareaLogo from "@/images/Marea-logo.png";

type UserSelectProps = {
  onSelect: (user: UserProfile) => void;
};

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}


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
        <div className="flex justify-center mb-10">
          <Image src={MareaLogo} alt="Marea" priority className="h-28 w-auto" />
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
