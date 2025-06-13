import { NextResponse } from "next/server";
import { withAuth, AuthenticatedUser } from "@/lib/dynamic-auth";

/**
 * API route handler for verifying a Dynamic JWT.
 *
 * This endpoint is responsible for server-side verification of the JWT
 * sent from the client. It extracts the token from cookies, validates it,
 * and returns user data upon successful verification.
 */
export const GET = withAuth(
  async (_req, { user }: { user: AuthenticatedUser }) => {
    return NextResponse.json({ message: "Access granted", user });
  }
);
