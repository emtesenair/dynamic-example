"use client";

import Image from "next/image";
import { useDarkMode } from "@/lib/useDarkMode";
import Link from "next/link";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: requires use client
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`container ${isDarkMode ? "dark" : "light"}`}>
      <div className="header">
        <Link href="/">
          <Image
            className="logo"
            src={isDarkMode ? "/logo-light.png" : "/logo-dark.png"}
            alt="dynamic"
            width="300"
            height="60"
          />
        </Link>
        <div className="header-buttons">
          <Link href="/examples" className="header-link">
            Examples
          </Link>
          <button
            className="docs-button"
            onClick={() =>
              window.open(
                "https://docs.dynamic.xyz",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Docs
          </button>
          <button
            className="get-started"
            onClick={() =>
              window.open(
                "https://app.dynamic.xyz",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Get started
          </button>
        </div>
      </div>
      {children}
      <div className="footer">
        <div className="footer-text">Made with 💙 by dynamic</div>
        <Image
          className="footer-image"
          src={isDarkMode ? "/image-dark.png" : "/image-light.png"}
          alt="dynamic"
          width="400"
          height="300"
        />
      </div>
    </div>
  );
}
