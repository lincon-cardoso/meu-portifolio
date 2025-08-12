"use client";

import { signOut } from "next-auth/react";

import type { ButtonHTMLAttributes } from "react";

export default function SignOutButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button onClick={() => signOut()} className={className} {...props}>
      Sair
    </button>
  );
}
