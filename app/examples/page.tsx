"use client";

import { DynamicWidget, useDynamicContext, useIsLoggedIn } from "@/lib/dynamic";
import DynamicMethods from "@/app/components/Methods";
import { useDarkMode } from "@/lib/useDarkMode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Methods() {
  const { isDarkMode } = useDarkMode();
  const { sdkHasLoaded } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (sdkHasLoaded && !isLoggedIn) router.push("/");
  }, [sdkHasLoaded, isLoggedIn, router]);

  if (!sdkHasLoaded || !isLoggedIn) return <div>Loading...</div>;

  return (
    <div className="content">
      <DynamicWidget />
      <DynamicMethods isDarkMode={isDarkMode} />
    </div>
  );
}
