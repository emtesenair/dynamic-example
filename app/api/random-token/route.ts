import { NextResponse } from "next/server";
import { withAuth, AuthenticatedUser } from "@/lib/dynamic-auth";

/**
 * API route handler for selecting and returning a random number.
 *
 * This is an authenticated endpoint that returns a random number between 0 and 3.
 */
export const GET = withAuth(
  async (_req, { user: _user }: { user: AuthenticatedUser }) => {
    const randomNumber = Math.floor(Math.random() * 4);
    return NextResponse.json({ randomNumber });
  }
);
