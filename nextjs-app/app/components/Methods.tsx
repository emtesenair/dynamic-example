"use client";
import { useState, useEffect } from "react";
import {
  useDynamicContext,
  useIsLoggedIn,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from "@dynamic-labs/ethereum";

import "./Methods.css";

interface DynamicMethodsProps {
  isDarkMode: boolean;
}

export default function DynamicMethods({ isDarkMode }: DynamicMethodsProps) {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet, user } = useDynamicContext();
  const userWallets = useUserWallets();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);

  const safeStringify = (obj: unknown): string => {
    const seen = new WeakSet();
    return JSON.stringify(
      obj,
      (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[Circular]";
          }
          seen.add(value);
        }
        return value;
      },
      2
    );
  };

  useEffect(() => {
    if (sdkHasLoaded && isLoggedIn && primaryWallet) setIsLoading(false);
    else setIsLoading(true);
  }, [sdkHasLoaded, isLoggedIn, primaryWallet]);

  function clearResult() {
    setResult("");
    setError(null);
  }

  async function verifyAuthToken() {
    try {
      setError(null);
      // NOTE: By default, this will call the PHP API.
      // To call the Next.js API, change the path to "/api/token-verify"
      // To call the php api locally, change the path to "http://localhost:8080/public/verify.php"
      const res = await fetch("/api/token-verify", {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");

      setResult(safeStringify(data));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to verify token");
    }
  }

  function showUser() {
    try {
      setResult(safeStringify(user));
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to stringify user data"
      );
    }
  }

  function showUserWallets() {
    try {
      const wallets = userWallets.map(({ _connector, ...rest }: any) => rest);
      setResult(safeStringify(wallets));
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to stringify wallet data"
      );
    }
  }

  async function fetchEthereumPublicClient() {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return;
    try {
      setIsLoading(true);
      const result = await primaryWallet.getPublicClient();
      setResult(safeStringify(result));
    } catch (error) {
      setResult(
        safeStringify({
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        })
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchEthereumWalletClient() {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return;
    try {
      setIsLoading(true);
      const result = await primaryWallet.getWalletClient();
      setResult(safeStringify(result));
    } catch (error) {
      setResult(
        safeStringify({
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        })
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchEthereumMessage() {
    if (!primaryWallet || !isEthereumWallet(primaryWallet)) return;
    try {
      setIsLoading(true);
      const result = await primaryWallet.signMessage("Hello World");
      setResult(safeStringify(result));
    } catch (error) {
      setResult(
        safeStringify({
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        })
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isLoading && (
        <div
          className="dynamic-methods"
          data-theme={isDarkMode ? "dark" : "light"}
        >
          <div className="methods-container">
            <button className="btn btn-primary" onClick={verifyAuthToken}>
              Verify Auth Token (Cookie)
            </button>
            <button className="btn btn-secondary" onClick={showUser}>
              Fetch User
            </button>
            <button className="btn btn-secondary" onClick={showUserWallets}>
              Fetch User Wallets
            </button>

            {primaryWallet && isEthereumWallet(primaryWallet) && (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={fetchEthereumPublicClient}
                >
                  Fetch PublicClient
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={fetchEthereumWalletClient}
                >
                  Fetch WalletClient
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={fetchEthereumMessage}
                >
                  Fetch Message
                </button>
              </>
            )}
          </div>
          {(result || error) && (
            <div className="results-container">
              {error ? (
                <pre className="results-text error">{error}</pre>
              ) : (
                <pre className="results-text">{result}</pre>
              )}
            </div>
          )}
          {(result || error) && (
            <div className="clear-container">
              <button className="btn btn-primary" onClick={clearResult}>
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
