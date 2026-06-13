"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentTicketsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/s/help");
  }, [router]);

  return null;
}
