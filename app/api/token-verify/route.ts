import { NextRequest, NextResponse } from "next/server";
import { verifyDynamicJWT } from "@/lib/dynamic-auth";

/**
 * API route handler for verifying a Dynamic JWT.
 *
 * This endpoint is responsible for server-side verification of the JWT
 * sent from the client. It extracts the token from cookies, validates it,
 * and returns user data upon successful verification.
 */
export async function POST(request: NextRequest) {
  try {
    // Extract JWT from the 'DYNAMIC_JWT_TOKEN' cookie.
    const dynamicJwt = request.cookies.get("DYNAMIC_JWT_TOKEN")?.value;

    if (!dynamicJwt) {
      return NextResponse.json(
        { error: "No authentication cookie found" },
        { status: 401 }
      );
    }

    // Verify the JWT using our utility function.
    // This checks the signature and expiration.
    const decodedToken = await verifyDynamicJWT(dynamicJwt);

    if (!decodedToken) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    // If the token is valid, return a success response with user data.
    return NextResponse.json({
      message: "Access granted",
      user: decodedToken,
    });
  } catch (error) {
    console.error("An unexpected error occurred in token verification:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
