// components/NavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

const excludedPaths = [ "/EmailVerified", "/PasswordReset", "/login", "/signup", "/forgot-password", "/reset-password"];

export default function NavbarWrapper() {
  const pathname = usePathname();
  const shouldRender = !excludedPaths.includes(pathname);

  return shouldRender ? <Navbar /> : null;
}
