"use client";

import { useState } from "react";

export function useAuth() {
  // TEMP MOCK (replace with real auth later)
  const [user, setUser] = useState({
    name: "Ravi Katiyar",
    role: "admin", // change to "student" to test
    avatar: "https://i.pravatar.cc/150?img=3",
  });

  const logout = () => {
    setUser(null as any);
  };

  return { user, logout };
}
