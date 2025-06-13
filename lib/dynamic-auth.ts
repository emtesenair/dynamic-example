import jwt, { JwtPayload } from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

/**
 * Represents the decoded payload of a Dynamic JWT.
 * @interface DynamicJwtPayload
 * @extends {JwtPayload}
 */
export interface DynamicJwtPayload extends JwtPayload {
  /** The environment ID from your Dynamic project. */
  environment_id: string;
  /** An array of verified credentials for the user. */
  verified_credentials: any[];
  /** The user's email, if available. */
  email?: string;
  /** Scopes for the JWT, which may indicate required actions. */
  scopes?: string[];
}

const DYNAMIC_ENV_ID = process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID;
/**
 * The JSON Web Key Set (JWKS) URL for Dynamic.
 * This URL is used to fetch the public keys required to verify JWTs.
 */
const JWKS_URL = `https://app.dynamic.xyz/api/v0/sdk/${DYNAMIC_ENV_ID}/.well-known/jwks`;

/**
 * A client to fetch JSON Web Keys (JWKs) from the Dynamic JWKS endpoint.
 * It is configured to cache keys to improve performance and avoid rate limiting.
 * @see https://docs.dynamic.xyz/authentication-methods/how-to-validate-users-on-the-backend#option-3-do-it-yourself-verification
 */
const client = new JwksClient({
  jwksUri: JWKS_URL,
  rateLimit: true,
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 600000, // 10 minutes
});

/**
 * Verifies a JWT from Dynamic.
 *
 * This function fetches the appropriate public key from Dynamic's JWKS endpoint
 * and uses it to verify the token's signature. It also checks for scopes
 * that may require additional handling.
 *
 * @param {string} token - The JWT to verify.
 * @returns {Promise<DynamicJwtPayload | null>} A promise that resolves with the decoded payload if the token is valid, or null if verification fails.
 * @see https://docs.dynamic.xyz/authentication-methods/how-to-validate-users-on-the-backend#option-3-do-it-yourself-verification
 */
export async function verifyDynamicJWT(
  token: string
): Promise<DynamicJwtPayload | null> {
  try {
    const signingKey = await client.getSigningKey();
    const publicKey = signingKey.getPublicKey();

    const decoded = jwt.verify(token, publicKey, {
      ignoreExpiration: false,
    }) as DynamicJwtPayload;

    // The 'requiresAdditionalAuth' scope indicates that the JWT requires
    // additional verification, such as Multi-Factor Authentication (MFA).
    // You should handle this case based on your application's security requirements.
    if (decoded.scopes?.includes("requiresAdditionalAuth")) {
      console.warn(
        "JWT requires additional authentication, but is being allowed. For stricter security, you should reject this token."
      );
      // For example, you might want to throw an error or return null here
      // depending on your application's security policy.
      // E.g., throw new Error("Additional verification required");
    }

    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
